using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Backend.Models;
using Backend.Data;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SleepTrackingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SleepTrackingController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/SleepTracking/user
        [HttpGet("user")]
        public IActionResult GetUserSleepLogs()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();            var sleepLogs = _context.SleepTrackings
                .Where(s => s.UserId == userId)
                .OrderByDescending(s => s.Date)
                .ToList();
            
            return Ok(sleepLogs);
        }

        // POST: api/SleepTracking
        [HttpPost]
        public IActionResult AddSleepLog([FromBody] SleepTracking sleepLog)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();

            sleepLog.UserId = userId;
              _context.SleepTrackings.Add(sleepLog);
            _context.SaveChanges();
            
            return Ok(sleepLog);
        }

        // PUT: api/SleepTracking/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateSleepLog(int id, [FromBody] SleepTracking sleepLog)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();

            var existingLog = _context.SleepTrackings.Find(id);
            if (existingLog == null) return NotFound();
            if (existingLog.UserId != userId) return Forbid();

            existingLog.HoursSlept = sleepLog.HoursSlept;
            existingLog.SleepQuality = sleepLog.SleepQuality;
            existingLog.Date = sleepLog.Date;

            _context.SaveChanges();
            return Ok(existingLog);
        }

        // DELETE: api/SleepTracking/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteSleepLog(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();

            var sleepLog = _context.SleepTrackings.Find(id);
            if (sleepLog == null) return NotFound();
            if (sleepLog.UserId != userId) return Forbid();

            _context.SleepTrackings.Remove(sleepLog);
            _context.SaveChanges();
            
            return Ok();
        }
    }
}
