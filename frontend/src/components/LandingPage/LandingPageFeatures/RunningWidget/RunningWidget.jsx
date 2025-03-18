import React from 'react';
import { FaRunning, FaEllipsisV, FaChevronRight, FaTachometerAlt } from 'react-icons/fa';
import { IoTimeOutline } from 'react-icons/io5';
import { BsFire } from 'react-icons/bs';
import './RunningWidget.css';

const RunningWidget = () => {
  return (
    <div className="RunningWidget-container">
      <div className="RunningWidget-header">
        <div className="RunningWidget-title">
          <FaRunning className="RunningWidget-icon" />
          <span>Running</span>
        </div>
        <FaEllipsisV className="RunningWidget-menu" />
      </div>
      
      <div className="RunningWidget-stats">
        <div className="RunningWidget-stat">
          <IoTimeOutline className="RunningWidget-statIcon" />
          <span>44'12"</span>
        </div>
        <div className="RunningWidget-stat">
          <BsFire className="RunningWidget-statIcon" />
          <span>860 cal</span>
        </div>
        <div className="RunningWidget-stat">
          <FaTachometerAlt className="RunningWidget-statIcon" />
          <span>11 km/h</span>
        </div>
      </div>
      
      <div className="RunningWidget-challenge">
        <div className="RunningWidget-challengeHeader">
          <span>Daily Running Challenge</span>
          <FaChevronRight className="RunningWidget-challengeArrow" />
        </div>
        <div className="RunningWidget-progressContainer">
          <div className="RunningWidget-progressBar">
            <div className="RunningWidget-progress" style={{ width: '78%' }}></div>
          </div>
          <div className="RunningWidget-values">
            <span>3.9 km</span>
            <span>5 km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunningWidget;