using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class WaterIntake
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public decimal Amount { get; set; } // in ml

        [Required]
        public DateTime IntakeTime { get; set; } = DateTime.UtcNow;

        public string? Note { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}