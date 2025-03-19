using Microsoft.EntityFrameworkCore;
using Backend.Models; 

namespace Backend.Data  
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        // Add this to your existing AppDbContext class
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<Nutrition> Nutritions { get; set; }
        public DbSet<WaterIntake> WaterIntakes { get; set; }
        public DbSet<SleepTracking> SleepTrackings { get; set; }
        public DbSet<Reminder> Reminders { get; set; }
    }
}