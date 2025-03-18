using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string LastName { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; } // Hashed password stored in DB

        public DateTime? DateOfBirth { get; set; } // Nullable field

        public string Gender { get; set; } // Male, Female, Other

        public float? Height { get; set; } // Nullable field (in cm)
        public float? Weight { get; set; } // Nullable field (in kg)

        public string FitnessGoal { get; set; } // Lose Weight, Maintain, Gain Muscle
        public string ActivityLevel { get; set; } // Sedentary, Lightly Active, Active, Very Active

        [Required]
        public bool TermsAccepted { get; set; } // Must be true to register

        public bool ReceiveNotifications { get; set; } // Optional
    }
}