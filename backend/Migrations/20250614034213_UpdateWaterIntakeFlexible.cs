using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateWaterIntakeFlexible : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WaterAmount",
                table: "WaterIntakes");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "WaterIntakes",
                newName: "IntakeTime");

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "WaterIntakes",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "WaterIntakes",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "WaterIntakes");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "WaterIntakes");

            migrationBuilder.RenameColumn(
                name: "IntakeTime",
                table: "WaterIntakes",
                newName: "Date");

            migrationBuilder.AddColumn<int>(
                name: "WaterAmount",
                table: "WaterIntakes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
