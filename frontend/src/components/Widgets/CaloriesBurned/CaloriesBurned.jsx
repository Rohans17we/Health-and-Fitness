import React from 'react';
import { BsFire } from 'react-icons/bs';
import { formatNumber } from '../../../utils/unitConversions';
import './CaloriesBurned.css';

/**
 * CaloriesBurned widget displays the number of calories burned by the user
 * @param {Object} props
 * @param {number} props.calories - Number of calories burned (in Cal)
 * @param {number} props.goal - Daily burn goal (in Cal, optional)
 */
const CaloriesBurned = ({ calories = 0, goal }) => {
  // Format the calories
  const formattedCalories = formatNumber(Math.round(calories), 0, 0);

  return (
    <div className="calories-burned-widget">      <div className="calories-burned-icon">
        <BsFire />
      </div>
      <div className="calories-burned-label">Calories Burned</div>
      <div className="calories-burned-divider"></div>      <div className="calories-burned-value">
        <span className="calories-value">{formattedCalories}</span>
        <span className="calories-unit"> cal</span>
      </div>
      {goal && (
        <div className="calories-burned-goal">
          Goal: {formatNumber(Math.round(goal), 0, 0)} cal
        </div>
      )}
    </div>
  );
};

export default CaloriesBurned;