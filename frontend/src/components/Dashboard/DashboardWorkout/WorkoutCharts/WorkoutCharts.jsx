import React from 'react';
import WeeklyCaloriesChart from './WeeklyCaloriesChart';
import './WorkoutCharts.css';

const WorkoutCharts = () => {
  return (
    <div className="workout-charts-container">
      <WeeklyCaloriesChart />
      {/* Add more chart components here as needed */}
    </div>
  );
};

export default WorkoutCharts;
