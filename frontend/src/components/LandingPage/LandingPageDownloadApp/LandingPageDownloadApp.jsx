import React from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import IPhone from '../../Iphone/iPhone';
import IphoneAppDownload from './IphoneAppDownload/IphoneAppDownload';
import './LandingPageDownloadApp.css';

const LandingPageDownloadApp = () => {
  return (
    <section className="LandingPageDownloadApp-section">
      <div className="LandingPageDownloadApp-container">
        <div className="LandingPageDownloadApp-phone">
          <div className="LandingPageDownloadApp-phone-iphone">
            <IPhone 
              primaryWidget={<IphoneAppDownload />}
            />
          </div>
        </div>
        <div className="LandingPageDownloadApp-content">
          <h2 className="LandingPageDownloadApp-title">Download NuHealth mobile app</h2>
          <p className="LandingPageDownloadApp-description">
            Download the Health App right now and see how you can start the next chapter in your life.
          </p>
          <div className="LandingPageDownloadApp-buttons">
            <a href="#" className="LandingPageDownloadApp-button LandingPageDownloadApp-button-apple">
              <FaApple className="LandingPageDownloadApp-button-icon" />
              <div className="LandingPageDownloadApp-button-text">
                <span className="LandingPageDownloadApp-button-small">Download on the</span>
                <span className="LandingPageDownloadApp-button-large">App Store</span>
              </div>
            </a>
            <a href="#" className="LandingPageDownloadApp-button LandingPageDownloadApp-button-google">
              <FaGooglePlay className="LandingPageDownloadApp-button-icon" />
              <div className="LandingPageDownloadApp-button-text">
                <span className="LandingPageDownloadApp-button-small">Download on the</span>
                <span className="LandingPageDownloadApp-button-large">Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPageDownloadApp;