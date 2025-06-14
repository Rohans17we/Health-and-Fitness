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
using System.Text.Json;

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
            var workoutDataRaw = await _context.Workouts
                .Where(w => w.UserId == user.Id)
                .ToListAsync();

            var workoutData = workoutDataRaw
                .GroupBy(w => w.Date.Date)
                .Select(group => new
                {
                    Date = group.Key,
                    CaloriesConsumed = 0f, // Ensure type match
                    CaloriesBurned = group.Sum(w =>
                    {
                        try
                        {
                            if (!string.IsNullOrEmpty(w.DetailsJson))
                            {
                                var details = JsonSerializer.Deserialize<Dictionary<string, object>>(w.DetailsJson);
                                if (details != null && details.ContainsKey("caloriesBurned"))
                                {
                                    var val = details["caloriesBurned"];
                                    if (val is JsonElement elem)
                                    {
                                        if (elem.ValueKind == JsonValueKind.Number)
                                            return elem.GetSingle();
                                        if (elem.ValueKind == JsonValueKind.String && float.TryParse(elem.GetString(), out var parsed))
                                            return parsed;
                                    }
                                    else if (val is float f)
                                    {
                                        return f;
                                    }
                                    else if (val is double d)
                                    {
                                        return (float)d;
                                    }
                                    else if (val is int i)
                                    {
                                        return (float)i;
                                    }
                                    else if (val != null && float.TryParse(val.ToString(), out var parsed))
                                    {
                                        return parsed;
                                    }
                                }
                            }
                        }
                        catch { }
                        return 0f;
                    })
                })
                .ToList();

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

        // GET: api/Analytics/nutrition-summary
        [HttpGet("nutrition-summary")]
        public async Task<IActionResult> GetNutritionSummary()
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null) return Unauthorized("Invalid token. Please log in again.");
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
            if (user == null) return NotFound("User not found.");

            var nutritionLogs = await _context.Nutritions
                .Where(n => n.UserId == user.Id)
                .ToListAsync();

            // Helper to extract float from details
            float ExtractFloat(Dictionary<string, object> details, string key)
            {
                if (details.TryGetValue(key, out var val))
                {
                    if (val is JsonElement elem)
                    {
                        if (elem.ValueKind == JsonValueKind.Number) return elem.GetSingle();
                        if (elem.ValueKind == JsonValueKind.String && float.TryParse(elem.GetString(), out var parsed)) return parsed;
                    }
                    else if (val is float f) return f;
                    else if (val is double d) return (float)d;
                    else if (val is int i) return (float)i;
                    else if (val != null && float.TryParse(val.ToString(), out var parsed)) return parsed;
                }
                return 0f;
            }

            // Aggregate macros and meal types per day
            var summary = nutritionLogs
                .GroupBy(n => n.ConsumptionDate.Date)
                .Select(g => {
                    float protein = 0, carbs = 0, fat = 0, fiber = 0, sugar = 0, calories = 0;
                    var mealTypes = new Dictionary<string, int>();
                    foreach (var n in g)
                    {
                        calories += n.CaloriesConsumed;
                        if (!string.IsNullOrEmpty(n.DetailsJson))
                        {
                            try
                            {
                                var details = JsonSerializer.Deserialize<Dictionary<string, object>>(n.DetailsJson);
                                if (details != null)
                                {
                                    protein += ExtractFloat(details, "protein");
                                    carbs += ExtractFloat(details, "carbs");
                                    fat += ExtractFloat(details, "fat");
                                    fiber += ExtractFloat(details, "fiber");
                                    sugar += ExtractFloat(details, "sugar");
                                }
                            }
                            catch { }
                        }
                        // Count meal types
                        var mealType = n.MealType ?? "Other";
                        if (!mealTypes.ContainsKey(mealType)) mealTypes[mealType] = 0;
                        mealTypes[mealType]++;
                    }
                    return new {
                        Date = g.Key.ToString("yyyy-MM-dd"),
                        Calories = calories,
                        Protein = protein,
                        Carbs = carbs,
                        Fat = fat,
                        Fiber = fiber,
                        Sugar = sugar,
                        MealTypes = mealTypes
                    };
                })
                .OrderBy(x => x.Date)
                .ToList();

            return Ok(summary);
        }

        // GET: api/Analytics/water-summary
        [HttpGet("water-summary")]
        public async Task<IActionResult> GetWaterSummary([FromQuery] int days = 30)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null) return Unauthorized("Invalid token. Please log in again.");
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
            if (user == null) return NotFound("User not found.");

            var since = DateTime.UtcNow.Date.AddDays(-days + 1);
            var waterLogs = await _context.WaterIntakes
                .Where(w => w.UserId == user.Id && w.IntakeTime >= since)
                .ToListAsync();

            var summary = waterLogs
                .GroupBy(w => w.IntakeTime.Date)
                .Select(g => new {
                    Date = g.Key.ToString("yyyy-MM-dd"),
                    Total = g.Sum(x => x.Amount)
                })
                .OrderBy(x => x.Date)
                .ToList();

            var totalAll = waterLogs.Sum(w => w.Amount);

            return Ok(new { total = totalAll, daily = summary });
        }

        // GET: api/Analytics/sleep-summary
        [HttpGet("sleep-summary")]
        public async Task<IActionResult> GetSleepSummary([FromQuery] int days = 30)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null) return Unauthorized("Invalid token. Please log in again.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
            if (user == null) return NotFound("User not found.");

            // Get date range - last 30 days by default
            var endDate = DateTime.UtcNow;
            var startDate = endDate.AddDays(-days);

            // Fetch sleep records in date range
            var sleepData = await _context.SleepTrackings
                .Where(s => s.UserId == user.Id && s.Date >= startDate && s.Date <= endDate)
                .OrderBy(s => s.Date)
                .ToListAsync();

            // Calculate total and average stats
            double totalHoursSlept = sleepData.Sum(s => s.HoursSlept);
            double avgHoursSlept = sleepData.Count > 0 ? totalHoursSlept / sleepData.Count : 0;
            
            // Get daily sleep hours for chart
            var dailySleep = sleepData
                .GroupBy(s => s.Date.Date)
                .OrderBy(g => g.Key)
                .Select(g => new {
                    Date = g.Key.ToString("yyyy-MM-dd"),
                    FormattedDate = g.Key.ToString("MMM dd"),
                    HoursSlept = g.Sum(s => s.HoursSlept)
                })
                .ToList();
                
            // Calculate streak
            int currentStreak = 0;
            var dates = sleepData.Select(s => s.Date.Date).Distinct().OrderByDescending(d => d).ToList();
            if (dates.Any())
            {
                var today = DateTime.UtcNow.Date;
                var yesterday = today.AddDays(-1);
                
                // Check if tracked today
                if (dates.Contains(today))
                {
                    currentStreak = 1;
                    var checkDate = yesterday;
                    
                    // Count consecutive days
                    while (dates.Contains(checkDate))
                    {
                        currentStreak++;
                        checkDate = checkDate.AddDays(-1);
                    }
                }
                // If not tracked today, check from yesterday
                else if (dates.Contains(yesterday)) 
                {
                    currentStreak = 1;
                    var checkDate = yesterday.AddDays(-1);
                    
                    while (dates.Contains(checkDate))
                    {
                        currentStreak++;
                        checkDate = checkDate.AddDays(-1);
                    }
                }
            }

            return Ok(new {
                TotalRecords = sleepData.Count,
                TotalHoursSlept = totalHoursSlept,
                AverageHoursSlept = Math.Round(avgHoursSlept, 1),
                CurrentStreak = currentStreak,
                DailySleep = dailySleep
            });
        }
    }
}