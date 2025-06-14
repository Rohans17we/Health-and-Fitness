import React from 'react';
import { BsDroplet } from 'react-icons/bs';
import { formatNumber } from '../../../utils/unitConversions';
import './WaterIntake.css';

/**
 * WaterIntake widget displays the amount of water consumed by the user
 * @param {Object} props
 * @param {number} props.amount - Amount of water consumed in milliliters (mL)
 * @param {number} props.goal - Daily water intake goal in milliliters (mL)
 */
const WaterIntake = ({ amount = 0, goal = 0 }) => {
  // Format the water amount in mL
  const formattedAmount = formatNumber(amount, 0, 0);
  const formattedGoal = formatNumber(goal, 0, 0);
  
  // Calculate progress percentage
  const progress = goal > 0 ? (amount / goal) * 100 : 0;
  const cappedProgress = Math.min(progress, 100); // Cap at 100%

  return (
    <div className="water-intake-widget">      <div className="water-intake-icon">
        <BsDroplet />
      </div>
      <div className="water-intake-label">Hydration</div>
      <div className="water-intake-divider"></div>      <div className="water-intake-value">
        <span className="water-amount">{formattedAmount} mL</span>
        <span className="water-goal">/{formattedGoal} mL Goal</span>
      </div>
      <div className="water-progress-container">
        <div 
          className="water-progress-bar"
          style={{ width: `${cappedProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default WaterIntake;