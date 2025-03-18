using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize] // Users must be logged in
[Route("api/[controller]")]
[ApiController]
public class WorkoutController : ControllerBase
{
    [HttpGet("my-workouts")]
    public IActionResult GetWorkouts()
    {
        return Ok("This is a protected route. Only authenticated users can see this!");
    }
}