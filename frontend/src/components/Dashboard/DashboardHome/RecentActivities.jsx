import React from 'react';
import { FaRunning, FaBiking, FaSwimmer, FaDumbbell } from 'react-icons/fa';

const RecentActivities = () => {
  const activities = [
    { 
      type: 'running', 
      name: 'Morning Run', 
      duration: '30 min', 
      calories: 320, 
      date: 'Today, 7:30 AM' 
    },
    { 
      type: 'cycling', 
      name: 'Cycling', 
      duration: '45 min', 
      calories: 450, 
      date: 'Yesterday, 6:15 PM' 
    },
    { 
      type: 'swimming', 
      name: 'Swimming', 
      duration: '40 min', 
      calories: 380, 
      date: '2 days ago, 8:00 AM' 
    },
    { 
      type: 'gym', 
      name: 'Weight Training', 
      duration: '50 min', 
      calories: 410, 
      date: '3 days ago, 5:30 PM' 
    }
  ];
  
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
    </div>
  );
};

export default RecentActivities;