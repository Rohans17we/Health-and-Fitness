using System.Security.Claims; // ✅ Import ClaimTypes
using Backend.Data;
using Backend.Models;
using Backend.Services;
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
            if (string.IsNullOrWhiteSpace(loginRequest.Email) || string.IsNullOrWhiteSpace(loginRequest.Password))
                return BadRequest("Email and password are required.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

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

        [Authorize]
        [HttpGet("current")]
        public async Task<IActionResult> GetCurrentUser()
            {
                try
                {
                    var emailClaim = User.FindFirst(ClaimTypes.Email);
                    if (emailClaim == null)
                        return Unauthorized(new { message = "Invalid token. Please log in again." });

                    string email = emailClaim.Value;
                    var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());

                    if (user == null)
                        return NotFound(new { message = "User not found. Please log in again." });

                    return Ok(new
                    {
                        id = user.Id,
                        firstName = user.FirstName,
                        lastName = user.LastName,
                        email = user.Email
                    });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = "Internal server error", error = ex.Message });
                }
            }


        // ✅ GET LOGGED-IN USER INFO (Using Email Claim Only)
        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            try
            {
                // ✅ Extract email from JWT Token
                var emailClaim = User.FindFirst(ClaimTypes.Email);
                if (emailClaim == null)
                {
                    Console.WriteLine("❌ No email claim found in token.");
                    return Unauthorized("Invalid token. Please log in again.");
                }

                string email = emailClaim.Value;
                Console.WriteLine($"🔍 Looking for user with email: {email}");

                // ✅ Fetch user by email (Not ID)
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
                if (user == null)
                {
                    Console.WriteLine($"❌ No user found with email: {email}");
                    return NotFound("User not found. Please log in again.");
                }

                Console.WriteLine($"✅ User found: {user.Id}, {user.Email}");
                
                return Ok(MapUserProfile(user));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error in GetUserProfile: {ex.Message}");
                return StatusCode(500, $"An error occurred while retrieving the user profile: {ex.Message}");
            }
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

        // ✅ MAP USER PROFILE DATA (PRIVATE METHOD)
        private object MapUserProfile(User user)
        {
            return new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email,
                Username = $"{user.FirstName} {user.LastName}",
                DateOfBirth = user.DateOfBirth?.ToString("yyyy-MM-dd"),
                user.Gender,
                user.Height,
                user.Weight,
                user.FitnessGoal,
                user.ActivityLevel
            };
        }
    }
}