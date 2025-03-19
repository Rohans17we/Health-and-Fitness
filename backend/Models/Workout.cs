using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class Workout
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string ExerciseType { get; set; }
        
        [Required]
        public DateTime Date { get; set; }

        public int Sets { get; set; }
        public int Reps { get; set; }
        public float Duration { get; set; } // in minutes
        public float CaloriesBurned { get; set; }
        public string Notes { get; set; }
        public string Intensity { get; set; } // Low, Medium, High

        [ForeignKey("UserId")]
        [JsonIgnore] // Prevent circular references in JSON serialization
        public User? User { get; set; } // Make nullable to indicate it's optional
    }
}