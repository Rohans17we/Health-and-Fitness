using Backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Services
{
    public class TokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(User user)
        {
            var jwtSecret = _configuration.GetValue<string>("JWT_SECRET") 
                ?? throw new InvalidOperationException("JWT_SECRET is missing.");

            var jwtIssuer = _configuration.GetValue<string>("JWT_ISSUER", "HealthTrackerAPI");
            var jwtAudience = _configuration.GetValue<string>("JWT_AUDIENCE", "HealthTrackerUsers");
            var tokenExpiryHours = _configuration.GetValue<int>("JWT_EXPIRY_HOURS", 2);

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Name, user.FirstName),
                new Claim(ClaimTypes.Surname, user.LastName)
            };

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(tokenExpiryHours), // Configurable Expiry
                signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}