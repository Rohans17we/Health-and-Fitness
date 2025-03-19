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
        public async Task<ActionResult<Workout>> PostWorkout(Workout workout)
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

            // Update the workout
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
        }

        private bool WorkoutExists(int id)
        {
            return _context.Workouts.Any(e => e.Id == id);
        }
    }
}