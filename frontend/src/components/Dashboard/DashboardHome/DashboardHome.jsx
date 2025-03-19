import React, { useEffect, useState } from 'react';
import './DashboardHome.css';
import StatCard from './StatCard';
import HealthMetrics from './HealthMetrics';
import ActivityChart from './ActivityChart';
import RecentActivities from './RecentActivities';
import WaterIntakeTracker from './WaterIntakeTracker';
import NutritionSummary from './NutritionSummary';

const DashboardHome = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Check if user data is available
    if (user) {
      // Fetch additional user profile data from the backend
      const fetchUserProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No authentication token found');
          }

          // Update the URL to include the full backend URL
          const response = await fetch('http://localhost:5057/api/User/profile', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response:', errorText);
            throw new Error(`Failed to fetch user profile: ${response.status} ${response.statusText}`);
          }

          const profileData = await response.json();
          console.log('Profile data received:', profileData);
          setUserProfile(profileData);
          setIsLoading(false);
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setError(err.message);
          setIsLoading(false);
        }
      };

      fetchUserProfile();
    } else {
      // If no user after 3 seconds, show error
      const timer = setTimeout(() => {
        if (!user) {
          setError("Unable to load user data. Please try again.");
          setIsLoading(false);
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [user]);

  // Show loading state
  if (isLoading) {
    return <div className="dashboard-loading">Loading user data...</div>;
  }

  // Show error state
  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  // If we get here but still no user or profile, use a fallback
  if (!user || !userProfile) {
    return (
      <div className="dashboard-error">
        <p>Session expired. Please log in again.</p>
        <button onClick={() => window.location.href = '/login'} className="login-button">
          Log In
        </button>
      </div>
    );
  }

  // Merge the basic user data with the profile data
  const mergedUserData = { ...user, ...userProfile };

  const userData = {
    firstName: mergedUserData.firstName || 'User',
    lastName: mergedUserData.lastName || '',
    fitnessGoal: mergedUserData.fitnessGoal || 'Not set',
    activityLevel: mergedUserData.activityLevel || 'Not set',
    healthMetrics: {
      heartRate: mergedUserData.healthMetrics?.heartRate || 'N/A',
      steps: mergedUserData.healthMetrics?.steps || 'N/A',
      caloriesBurned: mergedUserData.healthMetrics?.caloriesBurned || 'N/A'
    },
    waterIntake: {
      current: mergedUserData.waterIntake?.current || 0,
      goal: mergedUserData.waterIntake?.goal || 2.5
    },
    nutrition: {
      calories: {
        current: mergedUserData.nutrition?.calories?.current || 0,
        goal: mergedUserData.nutrition?.calories?.goal || 2200
      },
      protein: {
        current: mergedUserData.nutrition?.protein?.current || 0,
        goal: mergedUserData.nutrition?.protein?.goal || 120
      },
      carbs: {
        current: mergedUserData.nutrition?.carbs?.current || 0,
        goal: mergedUserData.nutrition?.carbs?.goal || 250
      },
      fat: {
        current: mergedUserData.nutrition?.fat?.current || 0,
        goal: mergedUserData.nutrition?.fat?.goal || 70
      }
    },
    activityData: mergedUserData.activityData || [],
    recentActivities: mergedUserData.recentActivities || [],
    weight: mergedUserData.weight || 'N/A',
    height: mergedUserData.height || 'N/A',
    bmi: calculateBMI(mergedUserData.height, mergedUserData.weight) || 'N/A',
    bodyFat: mergedUserData.bodyFat || 'N/A',
    goalWeight: mergedUserData.goalWeight || 'N/A',
    dateOfBirth: mergedUserData.dateOfBirth || 'N/A',
    gender: mergedUserData.gender || 'N/A'
  };

  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <h1>Welcome, {userData.Username || userData.firstName}!</h1>
        <div className="date-filter">
          <span>This month</span>
        </div>
      </div>
      
      <div className="stats-container">
        <StatCard 
          title="Fitness Goal" 
          value={userData.fitnessGoal} 
          icon="goal"
        />
        <StatCard 
          title="Activity Level" 
          value={userData.activityLevel} 
          icon="activity"
        />
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card health-metrics">
          <HealthMetrics userData={userData} />
        </div>
        
        <div className="dashboard-card activity-chart">
          <ActivityChart userData={userData} />
        </div>
        
        <div className="dashboard-card water-intake">
          <WaterIntakeTracker userData={userData} />
        </div>
        
        <div className="dashboard-card nutrition-summary">
          <NutritionSummary userData={userData} />
        </div>
        
        <div className="dashboard-card recent-activities">
          <RecentActivities userData={userData} />
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate BMI
function calculateBMI(height, weight) {
  if (!height || !weight || height === 'N/A' || weight === 'N/A') {
    return 'N/A';
  }
  
  // Convert height from cm to meters
  const heightInMeters = height / 100;
  // Calculate BMI: weight (kg) / height² (m²)
  const bmi = weight / (heightInMeters * heightInMeters);
  
  return bmi.toFixed(1);
}

export default DashboardHome;