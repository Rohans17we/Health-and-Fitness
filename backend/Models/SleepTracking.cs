using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class SleepTracking
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        public int HoursSlept { get; set; }
        public string SleepQuality { get; set; } // Poor, Average, Good

        public DateTime Date { get; set; } = DateTime.UtcNow;

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}