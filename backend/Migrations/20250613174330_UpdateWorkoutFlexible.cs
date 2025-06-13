using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateWorkoutFlexible : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CaloriesBurned",
                table: "Workouts");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Workouts");

            migrationBuilder.DropColumn(
                name: "Reps",
                table: "Workouts");

            migrationBuilder.DropColumn(
                name: "Sets",
                table: "Workouts");

            migrationBuilder.RenameColumn(
                name: "ExerciseType",
                table: "Workouts",
                newName: "WorkoutType");

            migrationBuilder.AddColumn<string>(
                name: "DetailsJson",
                table: "Workouts",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DetailsJson",
                table: "Workouts");

            migrationBuilder.RenameColumn(
                name: "WorkoutType",
                table: "Workouts",
                newName: "ExerciseType");

            migrationBuilder.AddColumn<float>(
                name: "CaloriesBurned",
                table: "Workouts",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Duration",
                table: "Workouts",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "Reps",
                table: "Workouts",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Sets",
                table: "Workouts",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
