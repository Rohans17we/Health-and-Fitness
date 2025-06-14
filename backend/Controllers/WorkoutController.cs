using System.Security.Claims;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WorkoutController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WorkoutController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Workout
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workout>>> GetWorkouts()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized("Invalid token. Please log in again.");
            }

            return await _context.Workouts
                .Where(w => w.UserId == userId)
                .OrderByDescending(w => w.Date)
                .ToListAsync();
        }

        // GET: api/Workout/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Workout>> GetWorkout(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized("Invalid token. Please log in again.");
            }

            var workout = await _context.Workouts.FindAsync(id);

            if (workout == null)
            {
                return NotFound();
            }

            // Ensure the workout belongs to the current user
            if (workout.UserId != userId)
            {
                return Forbid();
            }

            return workout;
        }

        // POST: api/Workout
        [HttpPost]
        public async Task<ActionResult<Workout>> PostWorkout([FromBody] Workout workout)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized("Invalid token. Please log in again.");
            }
        
            // Set the UserId from the token, ignoring any value sent in the request
            workout.UserId = userId;
            
            if (workout.Date == default)
            {
                workout.Date = DateTime.Now;
            }
        
            // We don't need the User property for creation
            ModelState.Remove("User");
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
        
            // Basic backend validation for common workout types
            var errors = ValidateWorkoutDetails(workout.WorkoutType, workout.DetailsJson);
            if (errors.Count > 0)
            {
                return BadRequest(new { errors });
            }
        
            _context.Workouts.Add(workout);
            await _context.SaveChangesAsync();
        
            return CreatedAtAction("GetWorkout", new { id = workout.Id }, workout);
        }

        // PUT: api/Workout/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkout(int id, Workout workout)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized("Invalid token. Please log in again.");
            }

            if (id != workout.Id)
            {
                return BadRequest();
            }

            // Ensure the workout belongs to the current user
            var existingWorkout = await _context.Workouts.FindAsync(id);
            if (existingWorkout == null)
            {
                return NotFound();
            }

            if (existingWorkout.UserId != userId)
            {
                return Forbid();
            }

            // Basic backend validation for common workout types
            var errors = ValidateWorkoutDetails(workout.WorkoutType, workout.DetailsJson);
            if (errors.Count > 0)
            {
                return BadRequest(new { errors });
            }

            workout.UserId = userId; // Ensure the user ID doesn't change
            _context.Entry(existingWorkout).State = EntityState.Detached;
            _context.Entry(workout).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkoutExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Workout/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkout(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized("Invalid token. Please log in again.");
            }

            var workout = await _context.Workouts.FindAsync(id);
            if (workout == null)
            {
                return NotFound();
            }

            // Ensure the workout belongs to the current user
            if (workout.UserId != userId)
            {
                return Forbid();
            }

            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();

            return NoContent();
        }        // GET: api/Workout/summary
        [HttpGet("summary")]
        public async Task<ActionResult<IEnumerable<object>>> GetWorkoutSummary([FromQuery] int days = 7)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized("Invalid token. Please log in again.");
            }

            // Calculate date range
            var endDate = DateTime.Now.Date.AddDays(1); // Include today, so end at midnight tomorrow
            var startDate = endDate.AddDays(-days);

            // Get all workouts in the date range
            var workouts = await _context.Workouts
                .Where(w => w.UserId == userId && w.Date >= startDate && w.Date < endDate)
                .ToListAsync();

            // Group by date and calculate totals
            var summary = new List<object>();
            var groupedByDate = workouts.GroupBy(w => w.Date.Date);
            
            foreach(var group in groupedByDate)
            {
                double totalCalories = 0;
                foreach(var workout in group)
                {
                    if (!string.IsNullOrEmpty(workout.DetailsJson))
                    {
                        try 
                        {
                            var details = System.Text.Json.JsonDocument.Parse(workout.DetailsJson).RootElement;
                            if (details.TryGetProperty("caloriesBurned", out var caloriesElement))
                            {
                                if (double.TryParse(caloriesElement.ToString(), out double calories))
                                {
                                    totalCalories += calories;
                                }
                            }
                        }
                        catch 
                        {
                            // If parsing fails, just continue
                        }
                    }
                }
                  summary.Add(new { 
                    date = group.Key.ToString("yyyy-MM-dd"),
                    total = totalCalories
                });            }
            
            return Ok(summary.OrderBy(s => ((dynamic)s).date).ToList());
        }

        private bool WorkoutExists(int id)
        {
            return _context.Workouts.Any(e => e.Id == id);
        }

        // Helper: Validate workout details JSON for common types
        private List<string> ValidateWorkoutDetails(string workoutType, string detailsJson)
        {
            var errors = new List<string>();
            if (string.IsNullOrEmpty(detailsJson)) return errors;
            try
            {
                var details = System.Text.Json.JsonDocument.Parse(detailsJson).RootElement;
                switch (workoutType?.ToLower())
                {
                    case "running":
                    case "cycling":
                    case "walking":
                        if (!details.TryGetProperty("distance", out _)) errors.Add("Distance is required.");
                        if (!details.TryGetProperty("duration", out _)) errors.Add("Duration is required.");
                        break;
                    case "weightlifting":
                    case "strength":
                        if (!details.TryGetProperty("exerciseName", out _)) errors.Add("Exercise name is required.");
                        if (!details.TryGetProperty("sets", out _)) errors.Add("Sets is required.");
                        if (!details.TryGetProperty("reps", out _)) errors.Add("Reps is required.");
                        if (!details.TryGetProperty("weight", out _)) errors.Add("Weight is required.");
                        break;
                    case "yoga":
                    case "pilates":
                        if (!details.TryGetProperty("style", out _)) errors.Add("Style is required.");
                        if (!details.TryGetProperty("duration", out _)) errors.Add("Duration is required.");
                        break;
                    case "hiit":
                        if (!details.TryGetProperty("duration", out _)) errors.Add("Duration is required.");
                        if (!details.TryGetProperty("rounds", out _)) errors.Add("Rounds is required.");
                        break;
                    // Add more types as needed
                }
            }
            catch
            {
                errors.Add("Invalid details JSON format.");
            }
            return errors;
        }
    }
}