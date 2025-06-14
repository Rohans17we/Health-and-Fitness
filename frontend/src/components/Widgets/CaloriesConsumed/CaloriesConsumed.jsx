import React from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { formatNumber } from '../../../utils/unitConversions';
import './CaloriesConsumed.css';

/**
 * CaloriesConsumed widget displays the number of calories consumed by the user
 * @param {Object} props
 * @param {number} props.calories - Number of calories consumed (in Cal)
 * @param {number} props.goal - Daily calorie goal (in Cal, optional)
 */
const CaloriesConsumed = ({ calories = 0, goal }) => {
  // Format the calories
  const formattedCalories = formatNumber(Math.round(calories), 0, 0);
  return (
    <div className="calories-consumed-widget">      <div className="calories-consumed-icon">
        <BsHeartFill />
      </div>
      <div className="calories-consumed-label">Calories Consumed</div>
      <div className="calories-consumed-divider"></div>      <div className="calories-consumed-value">
        <span className="calories-value">{formattedCalories}</span>
        <span className="calories-unit"> cal</span>
      </div>
      {goal && (
        <div className="calories-consumed-goal">
          Goal: {formatNumber(Math.round(goal), 0, 0)} cal
        </div>
      )}
    </div>
  );
};

export default CaloriesConsumed;