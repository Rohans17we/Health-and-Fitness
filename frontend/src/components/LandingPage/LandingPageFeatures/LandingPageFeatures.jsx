import React from 'react';
import './LandingPageFeatures.css';
import { FaGlobe, FaHeartbeat, FaRunning, FaChartLine, FaBullseye } from 'react-icons/fa';
import IPhone from '../../Iphone/iPhone';
import RunningWidget from './RunningWidget/RunningWidget'; 
import ChallengeWidget from './ChallengeWidget/ChallengeWidget';

const LandingPageFeatures = () => {
  return (
    <section className="LandingPageFeatures-section">
      <div className="LandingPageFeatures-container">
        {/* Top Features Section */}
        <div className="LandingPageFeatures-heading">
          <h2 className="LandingPageFeatures-title">Key features to boost your achievement goals</h2>
        </div>
        
        <div className="LandingPageFeatures-cards">
          <div className="LandingPageFeatures-card">
            <div className="LandingPageFeatures-icon LandingPageFeatures-icon-interactive">
              <FaHeartbeat size={24} />
            </div>
            <h3 className="LandingPageFeatures-card-title">Interactive Features</h3>
            <p className="LandingPageFeatures-description">
              Receive real-time feedback and encouragement from a virtual coach.
            </p>
          </div>
          
          <div className="LandingPageFeatures-card">
            <div className="LandingPageFeatures-icon LandingPageFeatures-icon-goal">
              <FaBullseye size={24} />
            </div>
            <h3 className="LandingPageFeatures-card-title">Goal Setting and Tracking</h3>
            <p className="LandingPageFeatures-description">
              Visualize your achievements with charts, graphs, and stats.
            </p>
          </div>
          
          <div className="LandingPageFeatures-card">
            <div className="LandingPageFeatures-icon LandingPageFeatures-icon-progress">
              <FaChartLine size={24} />
            </div>
            <h3 className="LandingPageFeatures-card-title">Progress Monitoring</h3>
            <p className="LandingPageFeatures-description">
              Record workouts, meals, and other health metrics.
            </p>
          </div>
        </div>
        
        {/* Hub Section */}
        <div className="LandingPageFeatures-hub-section">
          <div className="LandingPageFeatures-hub-container">
            <div className="LandingPageFeatures-hub-content">
              <h2 className="LandingPageFeatures-hub-title">Hub for more intelligent daily life</h2>
              <p className="LandingPageFeatures-hub-description">
                Track daily routines, assess health, and experiment with training plans all while managing your smart fitness gear.
              </p>
              
              <div className="LandingPageFeatures-hub-divider"></div>
              
              <div className="LandingPageFeatures-hub-features">
                <div className="LandingPageFeatures-hub-feature">
                  <div className="LandingPageFeatures-hub-feature-icon">
                    <FaGlobe size={40} color="#f97316" />
                  </div>
                  <h3 className="LandingPageFeatures-hub-feature-title">Sports Data</h3>
                  <p className="LandingPageFeatures-hub-feature-description">
                    See your workout data clearly every step of the way, so you can be sure you're reaching your goals.
                  </p>
                </div>
                
                <div className="LandingPageFeatures-hub-feature">
                  <div className="LandingPageFeatures-hub-feature-icon">
                    <FaRunning size={40} color="#f97316" />
                  </div>
                  <h3 className="LandingPageFeatures-hub-feature-title">Running Guide</h3>
                  <p className="LandingPageFeatures-hub-feature-description">
                    The Running Guide maps out your route as you're running it, displaying key information to keep you on target.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Hub image section */}
                <div className="LandingPageFeatures-hub-image">
                    <div className="LandingPageFeatures-hub-image-iphone">
                    <IPhone 
                        userName="Rohan"
                        primaryWidget={<RunningWidget />} 
                        secondaryWidget={<ChallengeWidget />}
                        bottomWidget={null}
                    />
                    </div>
                </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPageFeatures;