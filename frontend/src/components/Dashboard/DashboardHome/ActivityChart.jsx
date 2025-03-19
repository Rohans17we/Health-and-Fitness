import React from 'react';

const ActivityChart = ({ userData }) => {
  // Check if activity data exists
  const hasActivityData = userData?.activityData && 
                          Array.isArray(userData.activityData) && 
                          userData.activityData.length > 0;
  
  // Sample days of the week
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  
  return (
    <div className="activity-chart-container">
      <h3>Activity Overview</h3>
      
      <div className="chart-header">
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
      
      {hasActivityData ? (
        <div className="chart-placeholder">
          <div className="chart-bars">
            {days.map((day, index) => (
              <div className="chart-day" key={index}>
                <div 
                  className="bar workout" 
                  style={{ 
                    height: `${userData.activityData[index]?.workout || 0}%` 
                  }}
                ></div>
                <div 
                  className="bar steps" 
                  style={{ 
                    height: `${userData.activityData[index]?.steps || 0}%` 
                  }}
                ></div>
                <div className="day-label">{day}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="data-not-available">
          <p>Activity data not available</p>
        </div>
      )}
    </div>
  );
};

export default ActivityChart;