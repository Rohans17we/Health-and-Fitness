using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Backend.Data;
using Backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Directly set configuration values for local development/migrations
var dbProvider = "Sqlite";
var sqliteConn = "Data Source=healthtracker.db";
var jwtSecret = "cshajgdvmwjsvdjsuakjv12521332hgewdtjwqsgdv@$%^&*sgacdmaxv,vcjzmdh";
var jwtIssuer = "HealthTrackerAPI";
var jwtAudience = "HealthTrackerUsers";

// ✅ Flexible Database Provider (SQL Server or SQLite)
if (dbProvider == "Sqlite")
{
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlite(sqliteConn));
}
else
{
    var sqlServerConn = "Server=192.168.29.230,1433;Database=HealthTrackerDB;User Id=health_admin;Password=Rohans@17;TrustServerCertificate=True;";
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlServer(sqlServerConn));
}

var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));

// ✅ Configure JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = secretKey
        };
    });

builder.Services.AddAuthorization();

// ✅ Register TokenService for JWT Generation
builder.Services.AddScoped<TokenService>(_ => new TokenService(jwtSecret, jwtIssuer, jwtAudience, 2));

// ✅ Add Swagger with JWT Security
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "HealthTracker API", Version = "v1" });

    // ✅ Configure JWT Authorization in Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Enter 'Bearer YOUR_TOKEN_HERE' to authenticate",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173") // React App
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()); // Ensure credentials (cookies, headers) are allowed
});

var app = builder.Build();

app.UseCors("AllowFrontend");

// ✅ Enable Swagger always
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "HealthTracker API V1");
    c.RoutePrefix = "swagger";  // Now Swagger UI is at "/swagger"
});

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();