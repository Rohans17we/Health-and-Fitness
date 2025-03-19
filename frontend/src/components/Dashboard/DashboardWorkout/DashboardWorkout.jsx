import React, { useState, useEffect } from 'react';
import './DashboardWorkout.css';
import WorkoutForm from './WorkoutForm/WorkoutForm';
import WorkoutTable from './WorkoutTable/WorkoutTable';

const DashboardWorkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:5057/api/Workout', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch workouts: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setWorkouts(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleAddWorkout = async (workoutData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:5057/api/Workout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(workoutData)
      });

      if (!response.ok) {
        throw new Error(`Failed to add workout: ${response.status} ${response.statusText}`);
      }

      // Refresh the workout list
      fetchWorkouts();
      // Hide the form
      setShowForm(false);
    } catch (err) {
      console.error('Error adding workout:', err);
      setError(err.message);
    }
  };

  const handleDeleteWorkout = async (id) => {
    if (!window.confirm('Are you sure you want to delete this workout?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://localhost:5057/api/Workout/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete workout: ${response.status} ${response.statusText}`);
      }

      // Refresh the workout list
      fetchWorkouts();
    } catch (err) {
      console.error('Error deleting workout:', err);
      setError(err.message);
    }
  };

  return (
    <div className="dashboard-workout">
      <div className="dashboard-header">
        <h1>Workout Tracker</h1>
        <button 
          className="add-workout-btn" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Workout'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => fetchWorkouts()} className="retry-button">
            Retry
          </button>
        </div>
      )}

      {showForm && (
        <WorkoutForm onSubmit={handleAddWorkout} onCancel={() => setShowForm(false)} />
      )}

      {isLoading ? (
        <div className="loading">Loading workouts...</div>
      ) : (
        <WorkoutTable 
          workouts={workouts} 
          onDelete={handleDeleteWorkout} 
        />
      )}
    </div>
  );
};

export default DashboardWorkout;