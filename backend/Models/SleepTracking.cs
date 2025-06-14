using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class SleepTracking
    {
        [Key]
        public int Id { get; set; }        [Required]
        public int UserId { get; set; }

        public DateTime SleepStart { get; set; }
        public DateTime SleepEnd { get; set; }
        public double HoursSlept { get; set; }        public DateTime Date { get; set; } = DateTime.UtcNow;

        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}