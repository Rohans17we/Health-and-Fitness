import React from 'react';
import CaloriesConsumed from './CaloriesConsumed';
import CaloriesBurned from './CaloriesBurned';
import SleepTracking from './SleepTracking';
import WaterIntake from './WaterIntake';

/**
 * Demo component to showcase how to use the health widgets
 */
const WidgetsDemo = () => {
  // Sample data matching the image
  const mockData = {
    caloriesConsumed: 1750,
    caloriesBurned: 1850,
    sleepHours: 6,
    sleepMinutes: 45,
    waterIntake: 2.5,
    waterGoal: 3
  };

  const demoContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Health Widgets Demo</h2>
      <div style={demoContainerStyle}>
        <CaloriesConsumed calories={mockData.caloriesConsumed} />
        <CaloriesBurned calories={mockData.caloriesBurned} />
        <SleepTracking hours={mockData.sleepHours} minutes={mockData.sleepMinutes} />
        <WaterIntake amount={mockData.waterIntake} goal={mockData.waterGoal} />
      </div>
    </div>
  );
};

export default WidgetsDemo;
