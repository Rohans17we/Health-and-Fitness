using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public int Sets { get; set; }
        public int Reps { get; set; }
        public float Duration { get; set; } // in minutes

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}