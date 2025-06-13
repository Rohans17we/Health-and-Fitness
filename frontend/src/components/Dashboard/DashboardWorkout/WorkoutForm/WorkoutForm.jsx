import React, { useState } from 'react';
import './WorkoutForm.css';

// Define the fields required for each workout type
const workoutTypeFields = {
  Running: ['distance', 'duration', 'caloriesBurned', 'intensity', 'notes'],
  Walking: ['distance', 'duration', 'caloriesBurned', 'intensity', 'notes'],
  Cycling: ['distance', 'duration', 'caloriesBurned', 'intensity', 'notes'],
  Swimming: ['laps', 'duration', 'caloriesBurned', 'intensity', 'notes'],
  'Weight Training': ['sets', 'reps', 'weight', 'duration', 'caloriesBurned', 'intensity', 'notes'],
  Yoga: ['duration', 'caloriesBurned', 'intensity', 'notes'],
  HIIT: ['duration', 'caloriesBurned', 'intensity', 'notes'],
  Pilates: ['duration', 'caloriesBurned', 'intensity', 'notes'],
  Cardio: ['duration', 'caloriesBurned', 'intensity', 'notes'],
  Other: ['duration', 'caloriesBurned', 'intensity', 'notes'],
};

const initialDetailsState = {
  sets: '',
  reps: '',
  weight: '',
  distance: '',
  laps: '',
  duration: '',
  caloriesBurned: '',
  intensity: 'Medium',
  notes: '',
};

const WorkoutForm = ({ onSubmit, onCancel }) => {
  const [workoutType, setWorkoutType] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [details, setDetails] = useState(initialDetailsState);

  const exerciseTypes = Object.keys(workoutTypeFields);
  const intensityLevels = ['Low', 'Medium', 'High'];

  const handleTypeChange = (e) => {
    setWorkoutType(e.target.value);
    setDetails({ ...initialDetailsState, intensity: 'Medium' });
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build details object with only relevant fields
    const fields = workoutTypeFields[workoutType] || [];
    const filteredDetails = {};
    fields.forEach((field) => {
      if (details[field] !== '') {
        filteredDetails[field] = isNaN(details[field]) ? details[field] : Number(details[field]);
      }
    });
    onSubmit({
      workoutType,
      date,
      detailsJson: JSON.stringify(filteredDetails),
    });
  };

  // Render input for a given field name
  const renderField = (field) => {
    switch (field) {
      case 'sets':
      case 'reps':
      case 'weight':
      case 'distance':
      case 'laps':
      case 'duration':
      case 'caloriesBurned':
        return (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{
              field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')
            }{['duration', 'distance', 'weight'].includes(field) ? ` (${field === 'duration' ? 'minutes' : field === 'distance' ? 'km' : 'kg'})` : ''}</label>
            <input
              type="number"
              id={field}
              name={field}
              min="0"
              step="0.1"
              value={details[field]}
              onChange={handleDetailChange}
              required={['duration', 'distance', 'sets', 'reps', 'weight', 'laps'].includes(field)}
            />
          </div>
        );
      case 'intensity':
        return (
          <div className="form-group" key={field}>
            <label htmlFor="intensity">Intensity</label>
            <select
              id="intensity"
              name="intensity"
              value={details.intensity}
              onChange={handleDetailChange}
            >
              {intensityLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        );
      case 'notes':
        return (
          <div className="form-group" key={field}>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={details.notes}
              onChange={handleDetailChange}
              rows="3"
            ></textarea>
          </div>
        );
      default:
        return null;
    }
  };

  const fieldsToRender = workoutTypeFields[workoutType] || [];

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
              value={workoutType}
              onChange={handleTypeChange}
              required
            >
              <option value="">Select Exercise Type</option>
              {exerciseTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>
        {/* Render fields dynamically based on workout type */}
        <div className="form-row">
          {fieldsToRender
            .filter((f) => ['sets', 'reps', 'weight', 'distance', 'laps', 'duration', 'caloriesBurned'].includes(f))
            .map(renderField)}
        </div>
        <div className="form-row">
          {fieldsToRender
            .filter((f) => ['intensity'].includes(f))
            .map(renderField)}
        </div>
        {fieldsToRender.includes('notes') && renderField('notes')}
        <div className="form-actions">
          <button type="submit" className="submit-btn">Save Workout</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;