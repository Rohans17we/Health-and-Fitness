import React from 'react';
import { BsHeartFill } from 'react-icons/bs';
import './WeeklyCaloriesConsumed.css';

/**
 * WeeklyCaloriesConsumed widget displays the weekly calorie consumption data
 * @param {Object} props
 * @param {number} props.goal - Daily calorie goal (in calories)
 * @param {number} props.current - Current calorie consumption (in calories)
 * @param {Array} props.weeklyData - Array of daily calorie data for the week [day1, day2, ...]
 */
const WeeklyCaloriesConsumed = ({ goal = 2500, current = 0, weeklyData = [] }) => {
  // Format the calories
  const formattedGoal = Math.round(goal).toLocaleString();
  const formattedCurrent = Math.round(current).toLocaleString();
  
  // Calculate the percentage progress
  const progressPercentage = goal > 0 ? Math.min(Math.round((current / goal) * 100), 100) : 0;
  
  // Default data if none provided
  const defaultWeeklyData = [1750, 2100, 1920, 2300, 1840, 1650, 1420];
  const dailyData = weeklyData.length >= 7 ? weeklyData : defaultWeeklyData;
  
  // Find max value for scaling the bars
  const maxValue = Math.max(...dailyData, goal);
  
  // Get weekday names
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Calculate weekly average
  const weeklyAverage = Math.round(
    dailyData.reduce((sum, value) => sum + value, 0) / dailyData.length
  );
  
  // Get current day index (0 = Monday, 6 = Sunday)
  const today = new Date().getDay();
  // Convert from JS day (0 = Sunday) to our array (0 = Monday)
  const activeIndex = today === 0 ? 6 : today - 1;

  return (
    <div className="weekly-calories-consumed-widget">
      <div className="weekly-calories-consumed-header">
        <div className="weekly-calories-consumed-icon">
          <BsHeartFill />
        </div>
        <div className="weekly-calories-consumed-title">Calories Consumed</div>
      </div>
      
      <div className="weekly-calories-consumed-goal-container">
        <div className="weekly-calories-consumed-goal-value">
          {formattedGoal}
          <span className="weekly-calories-consumed-goal-max"> cal</span>
        </div>
      </div>
      
      <div className="weekly-calories-consumed-label">This Week</div>
      <div className="weekly-calories-consumed-current">{weeklyAverage} cal</div>
      
      <div className="weekly-calories-consumed-chart">
        {dailyData.map((value, index) => (
          <div key={index} className="weekly-calories-consumed-bar-container">
            <div 
              className={`weekly-calories-consumed-bar ${index === activeIndex ? 'active' : ''}`} 
              style={{ 
                height: `${Math.max((value / maxValue) * 100, 5)}%`, // Minimum 5% height for visibility
                background: index === activeIndex ? 'linear-gradient(to top, #923dff, #c09cff)' : '#f0f0f0'
              }}
            />
            <div className="weekly-calories-consumed-day">{weekdays[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCaloriesConsumed;
