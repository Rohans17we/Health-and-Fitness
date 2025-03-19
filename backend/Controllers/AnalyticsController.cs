using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AnalyticsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AnalyticsController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ GET: api/Analytics/calorie-comparison
        [HttpGet("calorie-comparison")]
        public async Task<IActionResult> GetCalorieComparison()
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null) return Unauthorized("Invalid token. Please log in again.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
            if (user == null) return NotFound("User not found.");

            // ✅ Fetch and aggregate nutrition data (Calories Consumed)
            var nutritionData = await _context.Nutritions
                .Where(n => n.UserId == user.Id)
                .GroupBy(n => n.ConsumptionDate)
                .Select(group => new
                {
                    Date = group.Key,
                    CaloriesConsumed = (float)group.Sum(n => n.CaloriesConsumed), // Ensure float type
                    CaloriesBurned = 0f 
                })
                .ToListAsync();

            // ✅ Fetch and aggregate workout data (Calories Burned)
            var workoutData = await _context.Workouts
                .Where(w => w.UserId == user.Id)
                .GroupBy(w => w.Date.Date)
                .Select(group => new
                {
                    Date = group.Key,
                    CaloriesConsumed = 0f, // Ensure type match
                    CaloriesBurned = (float)group.Sum(w => w.CaloriesBurned)
                })
                .ToListAsync();

            // ✅ Merge datasets with correct type handling
            var combinedData = nutritionData.Concat(workoutData)
                .GroupBy(d => d.Date)
                .Select(g => new
                {
                    Date = g.Key.ToString("yyyy-MM-dd"),
                    CaloriesConsumed = g.Sum(x => x.CaloriesConsumed),
                    CaloriesBurned = g.Sum(x => x.CaloriesBurned)
                })
                .OrderBy(d => d.Date)
                .ToList();

            return Ok(combinedData);
        }
    }
}