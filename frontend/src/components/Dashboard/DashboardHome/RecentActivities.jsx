import React from 'react';
import { FaRunning, FaBiking, FaSwimmer, FaDumbbell } from 'react-icons/fa';

const RecentActivities = ({ userData }) => {
  // Check if activities data exists
  const hasActivitiesData = userData?.recentActivities && 
                           Array.isArray(userData.recentActivities) && 
                           userData.recentActivities.length > 0;
  
  // Use user data if available, otherwise use sample data
  const activities = hasActivitiesData ? userData.recentActivities : [];
  
  const getActivityIcon = (type) => {
    switch(type) {
      case 'running':
        return <FaRunning />;
      case 'cycling':
        return <FaBiking />;
      case 'swimming':
        return <FaSwimmer />;
      case 'gym':
        return <FaDumbbell />;
      default:
        return <FaRunning />;
    }
  };
  
  return (
    <div className="recent-activities-container">
      <h3>Recent Activities</h3>
      
      {hasActivitiesData ? (
        <>
          <div className="activities-list">
            {activities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="activity-details">
                  <div className="activity-name">{activity.name}</div>
                  <div className="activity-meta">
                    {activity.duration} • {activity.calories} kcal
                  </div>
                </div>
                
                <div className="activity-date">{activity.date}</div>
              </div>
            ))}
          </div>
          
          <button className="view-all-btn">View All Activities</button>
        </>
      ) : (
        <div className="data-not-available">
          <p>No recent activities available</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivities;