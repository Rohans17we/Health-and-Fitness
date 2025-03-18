import React from 'react';
import { FaHeartbeat, FaWalking, FaFire } from 'react-icons/fa';

const HealthMetrics = ({ heartRate, steps, caloriesBurned }) => {
  return (
    <div className="health-metrics-container">
      <h3>Health Metrics</h3>
      
      <div className="metrics-grid">
        <div className="metric-item">
          <div className="metric-icon heart-rate">
            <FaHeartbeat />
          </div>
          <div className="metric-data">
            <span className="metric-value">{heartRate}</span>
            <span className="metric-label">Heart Rate</span>
            <span className="metric-unit">bpm</span>
          </div>
        </div>
        
        <div className="metric-item">
          <div className="metric-icon steps">
            <FaWalking />
          </div>
          <div className="metric-data">
            <span className="metric-value">{steps}</span>
            <span className="metric-label">Steps</span>
            <span className="metric-unit">today</span>
          </div>
        </div>
        
        <div className="metric-item">
          <div className="metric-icon calories">
            <FaFire />
          </div>
          <div className="metric-data">
            <span className="metric-value">{caloriesBurned}</span>
            <span className="metric-label">Calories</span>
            <span className="metric-unit">burned</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMetrics;