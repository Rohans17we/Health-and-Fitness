import React from 'react';
import IPhone from '../../../Iphone/iPhone';
import HeroMovesWidget from './HeroMovesWidget/HeroMovesWidget';
import HeroCaloriesWidget from './HeroCaloriesWidget/HeroCaloriesWidget';
import HeroActiveUsersWidget from './HeroActiveUsersWidget/HeroActiveUsersWidget';
import HeroActiveRatingsWidget from './HeroActiveRatingsWidget/HeroActiveRatingsWidget';
import './HeroWidget.css';

const HeroWidget = () => {
  return (
    <div className="HeroWidget-container">
      <div className="HeroWidget-container-left">
        <div className="HeroWidget-container-left-subcontainer">
          <HeroActiveUsersWidget />
          <HeroMovesWidget />
        </div>
      </div>
      
      <div className="HeroWidget-container-center">
        <IPhone userName="Rohan" />
      </div>
      
      <div className="HeroWidget-container-right">
        <div className="HeroWidget-container-right-subcontainer">
          <HeroCaloriesWidget />
          <HeroActiveRatingsWidget />
        </div>
      </div>
    </div>
  );
};

export default HeroWidget;