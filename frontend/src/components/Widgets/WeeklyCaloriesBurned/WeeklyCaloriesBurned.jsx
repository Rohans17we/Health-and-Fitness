import React, { useEffect, useState } from 'react';
import { BsFire } from 'react-icons/bs';
import './WeeklyCaloriesBurned.css';

/**
 * WeeklyCaloriesBurned widget displays the weekly calories burned data
 * @param {Object} props
 * @param {number} props.goal - Daily calorie burn goal (in calories)
 * @param {number} props.current - Current calories burned (in calories)
 * @param {Array} props.weeklyData - Array of daily calorie data for the week [day1, day2, ...]
 */
const WeeklyCaloriesBurned = ({ goal = 500, current = 0, weeklyData = [] }) => {
  const [displayData, setDisplayData] = useState([]);
  
  useEffect(() => {
    // If real data is provided and valid, use it
    if (Array.isArray(weeklyData) && weeklyData.length > 0) {
      console.log("Weekly calories burned data from props:", weeklyData);
      setDisplayData(weeklyData);
    } else {
      // Default data if none provided
      console.log("Using default weekly calories burned data");
      setDisplayData([320, 410, 380, 520, 470, 600, 350]);
    }
  }, [weeklyData]);
  
  // Format the calories
  const formattedGoal = Math.round(goal).toLocaleString();
  const formattedCurrent = Math.round(current).toLocaleString();
  
  // Calculate the percentage progress
  const progressPercentage = goal > 0 ? Math.min(Math.round((current / goal) * 100), 100) : 0;
  
  // Find max value for scaling the bars
  const maxValue = Math.max(...displayData, goal);
  
  // Get weekday names
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Calculate weekly average
  const weeklyAverage = Math.round(
    displayData.reduce((sum, value) => sum + value, 0) / displayData.length
  );
  
  // Get current day index (0 = Monday, 6 = Sunday)
  const today = new Date().getDay();
  // Convert from JS day (0 = Sunday) to our array (0 = Monday)
  const activeIndex = today === 0 ? 6 : today - 1;

  return (
    <div className="weekly-calories-burned-widget">
      <div className="weekly-calories-burned-header">
        <div className="weekly-calories-burned-icon">
          <BsFire />
        </div>
        <div className="weekly-calories-burned-title">Calories Burned</div>
      </div>
      
      <div className="weekly-calories-burned-goal-container">
        <div className="weekly-calories-burned-goal-value">
          {formattedGoal}
          <span className="weekly-calories-burned-goal-max"> cal</span>
        </div>
      </div>
      
      <div className="weekly-calories-burned-label">This Week</div>
      <div className="weekly-calories-burned-current">{weeklyAverage} cal</div>
      
      <div className="weekly-calories-burned-chart">
        {displayData.map((value, index) => (
          <div key={index} className="weekly-calories-burned-bar-container">
            <div 
              className={`weekly-calories-burned-bar ${index === activeIndex ? 'active' : ''}`} 
              style={{ 
                height: `${Math.max((value / maxValue) * 100, 5)}%`, // Minimum 5% height for visibility
                background: index === activeIndex ? 'linear-gradient(to top, #ff5e3a, #ff9d7a)' : '#f0f0f0'
              }}
            />
            <div className="weekly-calories-burned-day">{weekdays[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCaloriesBurned;
