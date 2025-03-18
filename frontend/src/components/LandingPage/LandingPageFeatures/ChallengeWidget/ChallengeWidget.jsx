import React from 'react';
import { FaLeaf, FaChevronRight, FaInfoCircle } from 'react-icons/fa';
import './ChallengeWidget.css';

const ChallengeWidget = () => {
  return (
    <div className="ChallengeWidget-container">
      <div className="ChallengeWidget-header">
        <div className="ChallengeWidget-iconContainer">
          <FaLeaf className="ChallengeWidget-icon" />
        </div>
        <div className="ChallengeWidget-titleContainer">
          <div className="ChallengeWidget-label">New Challenge</div>
          <div className="ChallengeWidget-points">4000</div>
        </div>
        <div className="ChallengeWidget-arrow">
          <FaChevronRight />
        </div>
      </div>
      
      <div className="ChallengeWidget-footer">
        <div className="ChallengeWidget-info">
          <FaInfoCircle className="ChallengeWidget-infoIcon" />
          <span>Allocating Total Points</span>
        </div>
        <button className="ChallengeWidget-button">Add Objective</button>
      </div>
    </div>
  );
};

export default ChallengeWidget;