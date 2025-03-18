using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; } // Plain text password for login
    }
}