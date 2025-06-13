import React from 'react';
import './WorkoutTable.css';

// Helper to get a summary of details for each workout type
const getWorkoutSummary = (workout) => {
  let details = {};
  try {
    details = workout.detailsJson ? JSON.parse(workout.detailsJson) : {};
  } catch {
    details = {};
  }
  const type = workout.workoutType || workout.exerciseType || 'Other';
  // Compose summary fields based on available details
  return {
    duration: details.duration ? `${details.duration}m` : '',
    distance: details.distance ? `${details.distance}km` : details.laps ? `${details.laps} laps` : '',
    sets: details.sets || '',
    reps: details.reps || '',
    weight: details.weight ? `${details.weight}kg` : '',
    calories: details.caloriesBurned || '',
    intensity: details.intensity || '',
    notes: details.notes || '',
    type,
  };
};

const WorkoutTable = ({ workouts, onDelete }) => {
  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (workouts.length === 0) {
    return (
      <div className="no-workouts">
        <p>No workout records found. Start tracking your fitness journey by adding your first workout!</p>
      </div>
    );
  }

  return (
    <div className="workout-table-container">
      <h2>Workout History</h2>
      <div className="table-responsive">
        <table className="workout-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Distance/Laps</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>Cal</th>
              <th>Intensity</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => {
              const summary = getWorkoutSummary(workout);
              return (
                <tr key={workout.id}>
                  <td>{formatDate(workout.date)}</td>
                  <td>{summary.type}</td>
                  <td>{summary.duration}</td>
                  <td>{summary.distance}</td>
                  <td>{summary.sets}</td>
                  <td>{summary.reps}</td>
                  <td>{summary.weight}</td>
                  <td>{summary.calories}</td>
                  <td>
                    {summary.intensity && (
                      <span className={`intensity-badge ${summary.intensity.toLowerCase()}`}>
                        {summary.intensity}
                      </span>
                    )}
                  </td>
                  <td>{summary.notes}</td>
                  <td>
                    <button 
                      className="delete-btn" 
                      onClick={() => onDelete(workout.id)}
                      aria-label="Delete workout"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkoutTable;