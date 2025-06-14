using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSleepTrackingModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SleepQuality",
                table: "SleepTrackings",
                newName: "SleepStart");

            migrationBuilder.AlterColumn<double>(
                name: "HoursSlept",
                table: "SleepTrackings",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<DateTime>(
                name: "SleepEnd",
                table: "SleepTrackings",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SleepEnd",
                table: "SleepTrackings");

            migrationBuilder.RenameColumn(
                name: "SleepStart",
                table: "SleepTrackings",
                newName: "SleepQuality");

            migrationBuilder.AlterColumn<int>(
                name: "HoursSlept",
                table: "SleepTrackings",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");
        }
    }
}
