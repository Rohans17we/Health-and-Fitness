using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Reminder
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string ReminderType { get; set; } // Workout, Meal, Water, Sleep

        public DateTime ReminderTime { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}