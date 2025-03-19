import React from 'react';
import { FaWeight, FaRulerVertical, FaPercentage, FaRuler, FaRunning, FaBullseye } from 'react-icons/fa';

const StatCard = ({ title, value, unit, goal, status, icon }) => {
  // Handle missing data
  const displayValue = value || 'Data not available';
  const displayGoal = goal || null;
  const displayStatus = status || null;
  
  const getIcon = () => {
    switch(icon) {
      case 'weight':
        return <FaWeight />;
      case 'height':
        return <FaRuler />;
      case 'bmi':
        return <FaRulerVertical />;
      case 'bodyFat':
        return <FaPercentage />;
      case 'activity':
        return <FaRunning />;
      case 'goal':
        return <FaBullseye />;
      default:
        return null;
    }
  };
  
  return (
    <div className="stat-card">
      <div className="stat-icon">{getIcon()}</div>
      <div className="stat-content">
        <h3>{title}</h3>
        <div className={`stat-value ${displayValue === 'Data not available' ? 'not-available' : ''}`}>
          {displayValue} {displayValue !== 'Data not available' && unit && <span className="stat-unit">{unit}</span>}
        </div>
        {displayGoal && (
          <div className="stat-goal">
            Goal: {displayGoal} {unit}
          </div>
        )}
        {displayStatus && (
          <div className={`stat-status ${displayStatus.toLowerCase()}`}>
            {displayStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;