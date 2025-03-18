import React from 'react';
import './HeroActiveUsersWidget.css';

const HeroActiveUsersWidget = ({ userCount = "200k+" }) => {
  return (
    <div className="HeroActiveUsersWidget-container">
      <div className="HeroActiveUsersWidget-content">
        <div className="HeroActiveUsersWidget-count">
          <span className="HeroActiveUsersWidget-number">{userCount}</span>
          <span className="HeroActiveUsersWidget-label">Active Users</span>
        </div>
        
        <div className="HeroActiveUsersWidget-avatars">
          <div className="HeroActiveUsersWidget-avatar" style={{ backgroundColor: '#FF725E', zIndex: 3 }}>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User 1" />
          </div>
          <div className="HeroActiveUsersWidget-avatar" style={{ backgroundColor: '#4CD964', zIndex: 2, transform: 'translateX(-10px)' }}>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User 2" />
          </div>
          <div className="HeroActiveUsersWidget-avatar" style={{ backgroundColor: '#FF9500', zIndex: 1, transform: 'translateX(-20px)' }}>
            <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="User 3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroActiveUsersWidget;