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

            _context.Nutritions.Add(nutrition);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNutrition), new { id = nutrition.Id }, nutrition);
        }
    }
}