import React from 'react';
import { FaStar } from 'react-icons/fa';
import './HeroActiveRatingsWidget.css';

const HeroActiveRatingsWidget = ({ rating = "4.8" }) => {
  return (
    <div className="HeroActiveRatingsWidget-container">
      <div className="HeroActiveRatingsWidget-content">
        <div className="HeroActiveRatingsWidget-star">
          <FaStar />
        </div>
        <div className="HeroActiveRatingsWidget-info">
          <div className="HeroActiveRatingsWidget-rating">{rating}</div>
          <div className="HeroActiveRatingsWidget-label">Active Ratings</div>
        </div>
      </div>
    </div>
  );
};

export default HeroActiveRatingsWidget;