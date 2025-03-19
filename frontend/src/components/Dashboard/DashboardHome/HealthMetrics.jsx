import React from 'react';
import { FaHeartbeat, FaWalking, FaFire } from 'react-icons/fa';

const HealthMetrics = ({ userData }) => {
  // Default values if data is not available
  const heartRate = userData?.healthMetrics?.heartRate || 'N/A';
  const steps = userData?.healthMetrics?.steps || 'N/A';
  const caloriesBurned = userData?.healthMetrics?.caloriesBurned || 'N/A';

  // Helper function to render metric value with appropriate styling
  const renderMetricValue = (value) => {
    if (value === 'N/A') {
      return <span className="metric-value not-available">Data not available</span>;
    }
    return <span className="metric-value">{value}</span>;
  };

  return (
    <div className="health-metrics-container">
      <h3>Health Metrics</h3>
      
      <div className="metrics-grid">
        <div className="metric-item">
          <div className="metric-icon heart-rate">
            <FaHeartbeat />
          </div>
          <div className="metric-data">
            {renderMetricValue(heartRate)}
            <span className="metric-label">Heart Rate</span>
            {heartRate !== 'N/A' && <span className="metric-unit">bpm</span>}
          </div>
        </div>
        
        <div className="metric-item">
          <div className="metric-icon steps">
            <FaWalking />
          </div>
          <div className="metric-data">
            {renderMetricValue(steps)}
            <span className="metric-label">Steps</span>
            {steps !== 'N/A' && <span className="metric-unit">today</span>}
          </div>
        </div>
        
        <div className="metric-item">
          <div className="metric-icon calories">
            <FaFire />
          </div>
          <div className="metric-data">
            {renderMetricValue(caloriesBurned)}
            <span className="metric-label">Calories</span>
            {caloriesBurned !== 'N/A' && <span className="metric-unit">burned</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMetrics;