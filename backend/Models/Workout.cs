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
        public string WorkoutType { get; set; } = string.Empty; // e.g., Running, Cycling, Weightlifting, etc.

        [Required]
        public DateTime Date { get; set; }

        public string Intensity { get; set; } = string.Empty; // Low, Medium, High
        public string Notes { get; set; } = string.Empty;

        // Flexible JSON field for type-specific details
        public string DetailsJson { get; set; } = string.Empty; // Store type-specific fields as JSON

        [ForeignKey("UserId")]
        [JsonIgnore] // Prevent circular references in JSON serialization
        public User? User { get; set; } // Make nullable to indicate it's optional
    }
}