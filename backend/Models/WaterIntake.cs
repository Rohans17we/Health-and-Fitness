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

        public int WaterAmount { get; set; } // in ml
        public DateTime Date { get; set; } = DateTime.UtcNow;

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}