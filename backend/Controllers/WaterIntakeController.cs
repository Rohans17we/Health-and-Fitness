using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class WaterIntakeController : ControllerBase
    {
        private readonly AppDbContext _context;
        public WaterIntakeController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/WaterIntake
        [HttpPost]
        public async Task<IActionResult> LogWater([FromBody] WaterIntake intake)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();
            intake.UserId = userId;
            intake.IntakeTime = intake.IntakeTime.ToUniversalTime();
            _context.WaterIntakes.Add(intake);
            await _context.SaveChangesAsync();
            return Ok(intake);
        }

        // GET: api/WaterIntake/user
        [HttpGet("user")]
        public async Task<IActionResult> GetUserWaterIntake()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();
            var logs = await _context.WaterIntakes
                .Where(w => w.UserId == userId)
                .OrderByDescending(w => w.IntakeTime)
                .ToListAsync();
            return Ok(logs);
        }

        // GET: api/WaterIntake/summary?days=7
        [HttpGet("summary")]
        public async Task<IActionResult> GetWaterSummary([FromQuery] int days = 7)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();
            var since = DateTime.UtcNow.Date.AddDays(-days + 1);
            var summary = await _context.WaterIntakes
                .Where(w => w.UserId == userId && w.IntakeTime >= since)
                .GroupBy(w => w.IntakeTime.Date)
                .Select(g => new {
                    Date = g.Key,
                    Total = g.Sum(x => x.Amount)
                })
                .OrderBy(x => x.Date)
                .ToListAsync();
            return Ok(summary);
        }
    }
}
