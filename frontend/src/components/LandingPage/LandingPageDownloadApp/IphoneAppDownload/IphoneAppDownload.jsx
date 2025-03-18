import React from 'react';
import { FaShareAlt, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './IphoneAppDownload.css';

const IphoneAppDownload = () => {
  return (
    <div className="IphoneAppDownload-container">
      <div className="IphoneAppDownload-header">
        <div className="IphoneAppDownload-back">
          <span className="IphoneAppDownload-back-arrow">‹</span>
          <span className="IphoneAppDownload-back-text">Search</span>
        </div>
      </div>
      
      <div className="IphoneAppDownload-app">
        <div className="IphoneAppDownload-app-icon">
          <div className="IphoneAppDownload-app-icon-inner">N</div>
        </div>
        <div className="IphoneAppDownload-app-info">
          <h1 className="IphoneAppDownload-app-name">NuHealth</h1>
          <p className="IphoneAppDownload-app-category">Health & Fitness</p>
          <button className="IphoneAppDownload-app-button">Open</button>
        </div>
        <div className="IphoneAppDownload-app-share">
          <FaShareAlt />
        </div>
      </div>
      
      <div className="IphoneAppDownload-details">
        <div className="IphoneAppDownload-detail">
          <div className="IphoneAppDownload-detail-value">4.5</div>
          <div className="IphoneAppDownload-detail-stars">
            <FaStar className="IphoneAppDownload-star-icon" />
            <FaStar className="IphoneAppDownload-star-icon" />
            <FaStar className="IphoneAppDownload-star-icon" />
            <FaStar className="IphoneAppDownload-star-icon" />
            <FaStarHalfAlt className="IphoneAppDownload-star-icon" />
          </div>
          <div className="IphoneAppDownload-detail-label">69 RATINGS</div>
        </div>
        
        <div className="IphoneAppDownload-detail">
          <div className="IphoneAppDownload-detail-value">12+</div>
          <div className="IphoneAppDownload-detail-label">AGE</div>
          <div className="IphoneAppDownload-detail-sublabel">Years Old</div>
        </div>
        
        <div className="IphoneAppDownload-detail">
          <div className="IphoneAppDownload-detail-icon">🏃</div>
          <div className="IphoneAppDownload-detail-label">CATEGORY</div>
          <div className="IphoneAppDownload-detail-sublabel">Health & Fitness</div>
        </div>
      </div>
      
      <div className="IphoneAppDownload-preview">
        <div className="IphoneAppDownload-preview-item">
          <div className="IphoneAppDownload-preview-screen">
            <div className="IphoneAppDownload-preview-greeting">
              <div className="IphoneAppDownload-preview-time">9:41</div>
              <div className="IphoneAppDownload-preview-hello">Hello,</div>
              <div className="IphoneAppDownload-preview-name">Rohan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IphoneAppDownload;