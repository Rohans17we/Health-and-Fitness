import React from 'react';
import './WorkoutTable.css';

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
              <th>Exercise Type</th>
              <th>Duration</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Calories</th>
              <th>Intensity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout.id}>
                <td>{formatDate(workout.date)}</td>
                <td>{workout.exerciseType}</td>
                <td>{workout.duration} min</td>
                <td>{workout.sets}</td>
                <td>{workout.reps}</td>
                <td>{workout.caloriesBurned}</td>
                <td>
                  <span className={`intensity-badge ${workout.intensity.toLowerCase()}`}>
                    {workout.intensity}
                  </span>
                </td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkoutTable;