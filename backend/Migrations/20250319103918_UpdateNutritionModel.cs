using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNutritionModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Calories",
                table: "Nutritions");

            migrationBuilder.DropColumn(
                name: "Carbs",
                table: "Nutritions");

            migrationBuilder.DropColumn(
                name: "Fats",
                table: "Nutritions");

            migrationBuilder.RenameColumn(
                name: "Protein",
                table: "Nutritions",
                newName: "CaloriesConsumed");

            migrationBuilder.AddColumn<DateTime>(
                name: "ConsumptionDate",
                table: "Nutritions",
                type: "Date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "ConsumptionTime",
                table: "Nutritions",
                type: "Time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConsumptionDate",
                table: "Nutritions");

            migrationBuilder.DropColumn(
                name: "ConsumptionTime",
                table: "Nutritions");

            migrationBuilder.RenameColumn(
                name: "CaloriesConsumed",
                table: "Nutritions",
                newName: "Protein");

            migrationBuilder.AddColumn<int>(
                name: "Calories",
                table: "Nutritions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Carbs",
                table: "Nutritions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Fats",
                table: "Nutritions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
