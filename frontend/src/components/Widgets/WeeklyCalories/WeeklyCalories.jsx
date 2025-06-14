import React from 'react';
import { BsFire } from 'react-icons/bs';
import './WeeklyCalories.css';

/**
 * WeeklyCalories widget displays the weekly calorie consumption data
 * @param {Object} props
 * @param {number} props.goal - Daily calorie goal (in calories)
 * @param {number} props.current - Current calorie consumption (in calories)
 * @param {Array} props.weeklyData - Array of daily calorie data for the week [day1, day2, ...]
 */
const WeeklyCalories = ({ goal = 2500, current = 0, weeklyData = [] }) => {
  // Format the calories
  const formattedGoal = Math.round(goal).toLocaleString();
  const formattedCurrent = Math.round(current).toLocaleString();
  
  // Calculate the percentage progress
  const progressPercentage = goal > 0 ? Math.min(Math.round((current / goal) * 100), 100) : 0;
  
  // Default data if none provided
  const defaultWeeklyData = [1386, 1580, 2100, 1350, 1890, 1700, 1450];
  const dailyData = weeklyData.length >= 7 ? weeklyData : defaultWeeklyData;
  
  // Find max value for scaling the bars
  const maxValue = Math.max(...dailyData, goal);
  
  // Get weekday names
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Calculate weekly average
  const weeklyAverage = Math.round(
    dailyData.reduce((sum, value) => sum + value, 0) / dailyData.length
  );  // Get current day index (0 = Monday, 6 = Sunday)
  const today = new Date().getDay();
  // Convert from JS day (0 = Sunday) to our array (0 = Monday)
  const activeIndex = today === 0 ? 6 : today - 1;

  return (
    <div className="weekly-calories-widget">
      <div className="weekly-calories-header">
        <div className="weekly-calories-icon">
          <BsFire />
        </div>
        <div className="weekly-calories-title">Calories</div>
      </div>
        <div className="weekly-calories-goal-container">
        <div className="weekly-calories-goal-value">
          {formattedGoal}
          <span className="weekly-calories-goal-max"> cal</span>
        </div>
      </div>
      
      <div className="weekly-calories-label">This Week</div>
      <div className="weekly-calories-current">{weeklyAverage} cal</div>
      
      <div className="weekly-calories-chart">
        {dailyData.map((value, index) => (
          <div key={index} className="weekly-calories-bar-container">
            <div 
              className={`weekly-calories-bar ${index === activeIndex ? 'active' : ''}`} 
              style={{ 
                height: `${Math.max((value / maxValue) * 100, 5)}%`, // Minimum 5% height for visibility
                background: index === activeIndex ? 'linear-gradient(to top, #923dff, #c09cff)' : '#f0f0f0'
              }}
            />
            <div className="weekly-calories-day">{weekdays[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalories;
