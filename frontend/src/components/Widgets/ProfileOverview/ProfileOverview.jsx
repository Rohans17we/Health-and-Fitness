import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './ProfileOverview.css';

/**
 * ProfileOverview component displays user profile info and key health metrics
 * @param {Object} props
 * @param {Object} props.userData - User data containing profile information
 * @param {string} props.userData.firstName - User's first name
 * @param {string} props.userData.lastName - User's last name
 * @param {string} props.userData.username - Username
 * @param {boolean} props.userData.isVerified - Whether user is verified
 * @param {number} props.userData.weight - Current weight in kg
 * @param {string} props.userData.fitnessGoal - User's fitness goal (e.g., "Lose Weight", "Gain Muscle")
 * @param {number} props.userData.bmi - Body Mass Index
 * @param {number} props.userData.height - User's height in cm
 */
const ProfileOverview = ({ userData }) => {
  // Default placeholder if no profile picture is provided
  const defaultProfilePic = 'https://via.placeholder.com/150';
  
  // Format numbers to have one decimal place
  const formatNumber = (num) => {
    if (typeof num === 'number') {
      return num.toFixed(1).replace('.0', '');
    }
    return num;
  };
  
  // Determine BMI category and assign appropriate class
  const getBmiCategory = (bmi) => {
    if (!bmi || bmi === 'N/A') return { category: 'unavailable', class: '' };
    const numBmi = parseFloat(bmi);
    
    if (numBmi < 18.5) return { category: 'underweight', class: 'bmi-underweight' };
    if (numBmi < 25) return { category: 'healthy', class: 'bmi-healthy' };
    if (numBmi < 30) return { category: 'overweight', class: 'bmi-overweight' };
    return { category: 'obese', class: 'bmi-obese' };
  };
  
  const bmiInfo = getBmiCategory(userData?.bmi);  return (
    <div className="profile-overview-widget">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-username">Username</div>
          <div className="profile-name">
            {userData?.firstName} {userData?.lastName}
            {userData?.isVerified && (
              <span className="verification-icon">
                <FaCheckCircle />
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="profile-divider"></div>
        <div className="profile-metrics">
        <div className="metric-item">
          <div className="metric-label">Weight</div>
          <div className="metric-value">{formatNumber(userData?.weight)} <span className="metric-unit">kg</span></div>
        </div>
        
        <div className="metric-item">
          <div className="metric-label">Fitness Goal</div>
          <div className="metric-value fitness-goal">{userData?.fitnessGoal || 'Not set'}</div>
        </div>
        
        <div className="metric-item">
          <div className="metric-label">BMI</div>
          <div className="metric-value">
            {formatNumber(userData?.bmi)}
            <span className={`bmi-tag ${bmiInfo.class}`}>{bmiInfo.category}</span>
          </div>
        </div>
        
        <div className="metric-item">
          <div className="metric-label">Height</div>
          <div className="metric-value">{formatNumber(userData?.height)}<span className="metric-unit">cm</span></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
