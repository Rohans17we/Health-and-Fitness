import React from 'react';
import './WorkoutTableFilters.css';

// Use all types from the add workout form
const workoutTypes = [
  'All',
  'Running',
  'Walking',
  'Cycling',
  'Swimming',
  'Weight Training',
  'Yoga',
  'HIIT',
  'Pilates',
  'Cardio',
  'Other',
];
const intensities = ['All', 'Low', 'Medium', 'High'];

const WorkoutTableFilters = ({ filters, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="workout-table-filters-container">
      <div className="workout-table-filters-label">Filter Workouts</div>
      <div className="workout-table-filters">
        <select name="workoutType" value={filters.workoutType} onChange={handleChange}>
          {workoutTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleChange} />
        <input type="date" name="dateTo" value={filters.dateTo} onChange={handleChange} />
        <input type="number" name="durationMin" value={filters.durationMin} onChange={handleChange} placeholder="Min Duration (min)" min="0" style={{width: 120}} />
        <input type="number" name="durationMax" value={filters.durationMax} onChange={handleChange} placeholder="Max Duration (min)" min="0" style={{width: 120}} />
        <input type="number" name="calMin" value={filters.calMin} onChange={handleChange} placeholder="Min Cal" min="0" style={{width: 80}} />
        <input type="number" name="calMax" value={filters.calMax} onChange={handleChange} placeholder="Max Cal" min="0" style={{width: 80}} />
        <select name="intensity" value={filters.intensity} onChange={handleChange}>
          {intensities.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default WorkoutTableFilters;
