import React from 'react';
import ProfileOverview from './ProfileOverview';

/**
 * Demo component to showcase how to use the ProfileOverview component
 */
const ProfileOverviewDemo = () => {  // Sample user data configured to match our updated component
  const mockUserData = {
    firstName: 'Dan',
    lastName: 'Anderson',
    username: 'dan.anderson',
    isVerified: true,
    weight: 75.5,
    fitnessGoal: 'Lose Weight',
    bmi: 24.3,
    height: 176,
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>User Profile Overview</h2>
      <ProfileOverview userData={mockUserData} />
    </div>
  );
};

export default ProfileOverviewDemo;
