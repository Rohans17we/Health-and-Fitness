import React from 'react';
import { FaWeight, FaRulerVertical, FaPercentage, FaRuler } from 'react-icons/fa';

const StatCard = ({ title, value, unit, goal, status, icon }) => {
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
      default:
        return null;
    }
  };
  
  return (
    <div className="stat-card">
      <div className="stat-icon">{getIcon()}</div>
      <div className="stat-content">
        <h3>{title}</h3>
        <div className="stat-value">
          {value} <span className="stat-unit">{unit}</span>
        </div>
        {goal && (
          <div className="stat-goal">
            Goal: {goal} {unit}
          </div>
        )}
        {status && (
          <div className={`stat-status ${status.toLowerCase()}`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;