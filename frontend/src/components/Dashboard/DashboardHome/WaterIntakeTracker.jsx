import React from 'react';
import { FaWater, FaPlus, FaMinus } from 'react-icons/fa';

const WaterIntakeTracker = ({ value, goal }) => {
  const percentage = Math.min(Math.round((value / goal) * 100), 100);
  
  return (
    <div className="water-intake-container">
      <h3>Water Intake</h3>
      
      <div className="water-progress">
        <div className="water-icon">
          <FaWater />
        </div>
        
        <div className="water-data">
          <div className="water-progress-bar">
            <div 
              className="water-progress-fill" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          <div className="water-stats">
            <span className="water-current">{value}L</span>
            <span className="water-goal">of {goal}L</span>
          </div>
        </div>
      </div>
      
      <div className="water-controls">
        <button className="water-btn decrease">
          <FaMinus />
        </button>
        <span className="water-amount">250ml</span>
        <button className="water-btn increase">
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default WaterIntakeTracker;