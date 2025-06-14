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
    public class NutritionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NutritionController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Get Authenticated User from Token
        private async Task<User?> GetAuthenticatedUser()
        {
            var emailClaim = User.FindFirst(ClaimTypes.Email);
            if (emailClaim == null) return null;

            string email = emailClaim.Value;
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        // ✅ GET: Fetch All Nutrition Logs for Logged-In User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Nutrition>>> GetNutrition()
        {
            var user = await GetAuthenticatedUser();
            if (user == null) return Unauthorized(new { message = "User not found" });

            // Fetch and order in memory for SQLite compatibility
            var nutritionLogs = await _context.Nutritions
                .Where(n => n.UserId == user.Id)
                .ToListAsync();

            nutritionLogs = nutritionLogs
                .OrderByDescending(n => n.ConsumptionDate)
                .ThenByDescending(n => n.ConsumptionTime)
                .ToList();

            return Ok(nutritionLogs);
        }

        // ✅ POST: Add New Nutrition Entry
        [HttpPost]
        public async Task<ActionResult<Nutrition>> PostNutrition([FromBody] Nutrition nutrition)
        {
            var user = await GetAuthenticatedUser();
            if (user == null) return Unauthorized(new { message = "User not found" });

            nutrition.UserId = user.Id;
            nutrition.User = null; // Prevent serialization issues

            // If DetailsJson is empty, build it from legacy fields for compatibility
            if (string.IsNullOrWhiteSpace(nutrition.DetailsJson))
            {
                var details = new Dictionary<string, object>
                {
                    { "calories", nutrition.CaloriesConsumed },
                    { "foodName", nutrition.FoodName },
                    { "servingSize", "" },
                    { "quantity", 1 },
                    { "unit", "g" },
                    { "protein", 0 },
                    { "carbs", 0 },
                    { "fat", 0 },
                    { "fiber", 0 },
                    { "sugar", 0 },
                    { "brand", "" },
                };
                nutrition.DetailsJson = System.Text.Json.JsonSerializer.Serialize(details);
            }

            _context.Nutritions.Add(nutrition);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNutrition), new { id = nutrition.Id }, nutrition);
        }

        // GET: api/Nutrition/summary - Get nutrition summary for a time period
        [HttpGet("summary")]
        public async Task<ActionResult<IEnumerable<object>>> GetNutritionSummary([FromQuery] int days = 7)
        {
            var user = await GetAuthenticatedUser();
            if (user == null) return Unauthorized(new { message = "User not found" });

            // Calculate date range
            var endDate = DateTime.Now.Date.AddDays(1); // Include today, so end at midnight tomorrow
            var startDate = endDate.AddDays(-days);

            // Get all nutrition entries in the date range
            var nutritions = await _context.Nutritions
                .Where(n => n.UserId == user.Id && n.ConsumptionDate >= startDate && n.ConsumptionDate < endDate)
                .ToListAsync();

            // Group by date and calculate totals
            var summary = nutritions
                .GroupBy(n => n.ConsumptionDate.Date)
                .Select(g => new 
                {
                    date = g.Key.ToString("yyyy-MM-dd"),
                    total = g.Sum(n => n.CaloriesConsumed)
                })
                .OrderBy(s => s.date)
                .ToList();

            return Ok(summary);
        }
    }
}