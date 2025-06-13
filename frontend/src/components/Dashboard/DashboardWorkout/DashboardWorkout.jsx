import React, { useState, useEffect } from 'react';
import './DashboardWorkout.css';
import WorkoutForm from './WorkoutForm/WorkoutForm';
import WorkoutTable from './WorkoutTable/WorkoutTable';
import WorkoutTableFilters from './WorkoutTable/WorkoutTableFilters';
import './WorkoutTable/WorkoutTableFilters.css';

const defaultFilters = {
  workoutType: 'All',
  dateFrom: '',
  dateTo: '',
  durationMin: '',
  durationMax: '',
  calMin: '',
  calMax: '',
  intensity: 'All',
};

const DashboardWorkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);

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
      fetchWorkouts();
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
      fetchWorkouts();
    } catch (err) {
      console.error('Error deleting workout:', err);
      setError(err.message);
    }
  };

  // Filtering logic
  const getFilteredWorkouts = () => {
    let filtered = [...workouts];
    if (filters.workoutType !== 'All') filtered = filtered.filter(w => (w.workoutType || w.exerciseType || 'Other') === filters.workoutType);
    if (filters.dateFrom) filtered = filtered.filter(w => w.date >= filters.dateFrom);
    if (filters.dateTo) filtered = filtered.filter(w => w.date <= filters.dateTo);
    if (filters.durationMin) filtered = filtered.filter(w => {
      let d = 0;
      try { d = w.detailsJson ? JSON.parse(w.detailsJson).duration || 0 : 0; } catch { d = 0; }
      return d >= Number(filters.durationMin);
    });
    if (filters.durationMax) filtered = filtered.filter(w => {
      let d = 0;
      try { d = w.detailsJson ? JSON.parse(w.detailsJson).duration || 0 : 0; } catch { d = 0; }
      return d <= Number(filters.durationMax);
    });
    if (filters.calMin) filtered = filtered.filter(w => {
      let c = 0;
      try { c = w.detailsJson ? JSON.parse(w.detailsJson).caloriesBurned || 0 : 0; } catch { c = 0; }
      return c >= Number(filters.calMin);
    });
    if (filters.calMax) filtered = filtered.filter(w => {
      let c = 0;
      try { c = w.detailsJson ? JSON.parse(w.detailsJson).caloriesBurned || 0 : 0; } catch { c = 0; }
      return c <= Number(filters.calMax);
    });
    if (filters.intensity !== 'All') filtered = filtered.filter(w => {
      let i = '';
      try { i = w.detailsJson ? JSON.parse(w.detailsJson).intensity || '' : ''; } catch { i = ''; }
      return i === filters.intensity;
    });
    return filtered;
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
      <WorkoutTableFilters filters={filters} onChange={setFilters} />
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
          workouts={getFilteredWorkouts()} 
          onDelete={handleDeleteWorkout} 
        />
      )}
    </div>
  );
};

export default DashboardWorkout;