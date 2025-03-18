import React from 'react';

const ActivityChart = () => {
  // In a real app, you would use a charting library like Chart.js or Recharts
  return (
    <div className="activity-chart-container">
      <div className="chart-header">
        <h3>Activity Overview</h3>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color workout"></div>
            <span>Workout</span>
          </div>
          <div className="legend-item">
            <div className="legend-color steps"></div>
            <span>Steps</span>
          </div>
        </div>
      </div>
      
      <div className="chart-placeholder">
        {/* This would be replaced with an actual chart component */}
        <div className="chart-bars">
          <div className="chart-day">
            <div className="bar workout" style={{ height: '60%' }}></div>
            <div className="bar steps" style={{ height: '80%' }}></div>
            <div className="day-label">Mon</div>
          </div>
          <div className="chart-day">
            <div className="bar workout" style={{ height: '40%' }}></div>
            <div className="bar steps" style={{ height: '70%' }}></div>
            <div className="day-label">Tue</div>
          </div>
          <div className="chart-day">
            <div className="bar workout" style={{ height: '70%' }}></div>
            <div className="bar steps" style={{ height: '60%' }}></div>
            <div className="day-label">Wed</div>
          </div>
          <div className="chart-day">
            <div className="bar workout" style={{ height: '30%' }}></div>
            <div className="bar steps" style={{ height: '50%' }}></div>
            <div className="day-label">Thu</div>
          </div>
          <div className="chart-day">
            <div className="bar workout" style={{ height: '80%' }}></div>
            <div className="bar steps" style={{ height: '90%' }}></div>
            <div className="day-label">Fri</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;