import React, { useState } from 'react';
import './WorkoutForm.css';

const WorkoutForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    exerciseType: '',
    date: new Date().toISOString().split('T')[0],
    sets: 0,
    reps: 0,
    duration: 0,
    caloriesBurned: 0,
    intensity: 'Medium',
    notes: ''
  });

  const exerciseTypes = [
    'Running',
    'Walking',
    'Cycling',
    'Swimming',
    'Weight Training',
    'Yoga',
    'HIIT',
    'Pilates',
    'Cardio',
    'Other'
  ];

  const intensityLevels = ['Low', 'Medium', 'High'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'sets' || name === 'reps' || name === 'duration' || name === 'caloriesBurned'
        ? parseFloat(value)
        : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="workout-form-container">
      <h2>Add New Workout</h2>
      <form onSubmit={handleSubmit} className="workout-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="exerciseType">Exercise Type</label>
            <select
              id="exerciseType"
              name="exerciseType"
              value={formData.exerciseType}
              onChange={handleChange}
              required
            >
              <option value="">Select Exercise Type</option>
              {exerciseTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="sets">Sets</label>
            <input
              type="number"
              id="sets"
              name="sets"
              min="0"
              value={formData.sets}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reps">Reps</label>
            <input
              type="number"
              id="reps"
              name="reps"
              min="0"
              value={formData.reps}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              min="0"
              step="0.1"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="caloriesBurned">Calories Burned</label>
            <input
              type="number"
              id="caloriesBurned"
              name="caloriesBurned"
              min="0"
              value={formData.caloriesBurned}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="intensity">Intensity</label>
            <select
              id="intensity"
              name="intensity"
              value={formData.intensity}
              onChange={handleChange}
            >
              {intensityLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Save Workout</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;