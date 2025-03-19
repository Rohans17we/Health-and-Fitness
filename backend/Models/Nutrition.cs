using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Nutrition
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; } // ✅ Required to establish relationship

        [Required]
        public string FoodName { get; set; }

        [Required]
        public int CaloriesConsumed { get; set; }

        [Required]
        [Column(TypeName = "Date")]
        public DateTime ConsumptionDate { get; set; }

        [Required]
        [Column(TypeName = "Time")]
        public TimeSpan ConsumptionTime { get; set; }

        // ✅ Keep User nullable to avoid requiring full User object in requests
        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}