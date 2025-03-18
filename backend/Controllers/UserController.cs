using Backend.Data;
using Backend.Models;
using Backend.Services; // Import TokenService
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public UserController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // ✅ REGISTER USER
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                return BadRequest("Email is already in use.");

            user.PasswordHash = HashPassword(user.PasswordHash);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully!");
        }

        // ✅ LOGIN USER
        [HttpPost("login")]
            public async Task<IActionResult> LoginUser([FromBody] LoginRequest loginRequest)
            {
                // ✅ Ensure request contains both email and password
                if (string.IsNullOrWhiteSpace(loginRequest.Email) || string.IsNullOrWhiteSpace(loginRequest.Password))
                    return BadRequest("Email and password are required.");

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);
                
                // ✅ Check if user exists and password matches
                if (user == null || !VerifyPassword(loginRequest.Password, user.PasswordHash))
                    return Unauthorized("Invalid email or password.");

                var token = _tokenService.GenerateToken(user);

                return Ok(new
                {
                    Message = "Login successful!",
                    Token = token,
                    User = new
                    {
                        user.Id,
                        user.FirstName,
                        user.LastName,
                        user.Email
                    }
                });
            }
        // ✅ GET LOGGED-IN USER INFO (Protected Route)
        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var userId = int.Parse(User.FindFirst("sub")?.Value ?? "0");

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound("User not found.");

            return Ok(new 
            { 
                user.Id, 
                user.FirstName, 
                user.LastName, 
                user.Email, 
                user.FitnessGoal, 
                user.ActivityLevel 
            });
        }

        // ✅ HASH PASSWORD (PRIVATE METHOD)
        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }

        // ✅ VERIFY PASSWORD (PRIVATE METHOD)
        private bool VerifyPassword(string inputPassword, string storedHash)
        {
            return HashPassword(inputPassword) == storedHash;
        }
    }
}