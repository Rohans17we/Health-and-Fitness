import React from 'react';
import { FaWater, FaPlus, FaMinus } from 'react-icons/fa';

const WaterIntakeTracker = ({ userData }) => {
  // Handle missing data
  const value = userData?.waterIntake?.current || 0;
  const goal = userData?.waterIntake?.goal || 2.5; // Default goal
  
  const percentage = Math.min(Math.round((value / goal) * 100), 100);
  
  // Check if data is available
  const hasData = userData?.waterIntake !== undefined;
  
  return (
    <div className="water-intake-container">
      <h3>Water Intake</h3>
      
      {hasData ? (
        <>
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
        </>
      ) : (
        <div className="data-not-available">
          <p>Water intake data not available</p>
        </div>
      )}
    </div>
  );
};

export default WaterIntakeTracker;