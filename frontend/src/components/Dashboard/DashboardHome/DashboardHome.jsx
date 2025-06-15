import React, { useEffect, useState } from 'react';
import './DashboardHome.css';
import ProfileOverview from '../../Widgets/ProfileOverview';
import CaloriesConsumed from '../../Widgets/CaloriesConsumed';
import CaloriesBurned from '../../Widgets/CaloriesBurned';
import SleepTracking from '../../Widgets/SleepTracking';
import WaterIntake from '../../Widgets/WaterIntake';
import WeeklyCaloriesConsumed from '../../Widgets/WeeklyCaloriesConsumed';
import WeeklyCaloriesBurned from '../../Widgets/WeeklyCaloriesBurned';
import NutritionPieChart from './NutritionPieChart';

const DashboardHome = ({ user }) => {  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  // Health metrics data states
  const [healthMetrics, setHealthMetrics] = useState({
    caloriesConsumed: 0,
    caloriesBurned: 0,
    sleepHours: 0,
    sleepMinutes: 0,
    waterIntake: 0,
    waterGoal: 3000, // Default goal: 3000mL
    calorieGoal: 2500, // Default calorie goal
    weeklyCaloriesConsumed: [], // Weekly consumed calories data
    weeklyCaloriesBurned: [], // Weekly burned calories data
    nutritionEntries: [] // Today's nutrition entries for the pie chart
  });
  
  const [metricsLoading, setMetricsLoading] = useState(true);

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
          
          // After getting user profile, fetch health metrics data
          fetchHealthMetricsData(token);
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
    // Function to fetch all health metrics data
  const fetchHealthMetricsData = async (token) => {
    setMetricsLoading(true);
    
    try {
      console.log("Fetching health metrics data...");
      
      // Create promises for all the API calls
      const promises = [
        fetchTodaysNutrition(token),
        fetchTodaysWorkouts(token),
        fetchLatestSleep(token),
        fetchTodaysWaterIntake(token),
        fetchWeeklyNutrition(token),
        fetchWeeklyWorkouts(token)
      ];
        
      // Wait for all API calls to complete
      const [nutrition, workouts, sleep, water, weeklyNutrition, weeklyWorkouts] = await Promise.all(promises);
      
      console.log("All health metrics fetched successfully");
      console.log("Weekly nutrition data:", weeklyNutrition);
      console.log("Weekly workout data:", weeklyWorkouts);
      
      // Extract calorie goal from user profile if available
      const calorieGoal = userProfile?.calorieGoal || 2500; // Use user's goal or default to 2500
      
      setHealthMetrics({
        caloriesConsumed: nutrition.totalCalories || 0,
        caloriesBurned: workouts.totalCaloriesBurned || 0,
        sleepHours: sleep.hours || 0,
        sleepMinutes: sleep.minutes || 0,
        waterIntake: water.totalAmountML || 0,
        waterGoal: 3000, // Default goal is 3000mL
        calorieGoal: calorieGoal,
        weeklyCaloriesConsumed: weeklyNutrition || [],
        weeklyCaloriesBurned: weeklyWorkouts || [],
        nutritionEntries: nutrition.entries || [] // Today's nutrition entries
      });
    } catch (err) {
      console.error('Error fetching health metrics:', err);
      // Use fallback data if there's an error, but still provide empty arrays for weekly data
      setHealthMetrics({
        caloriesConsumed: 0,
        caloriesBurned: 0,
        sleepHours: 0,
        sleepMinutes: 0,
        waterIntake: 0,
        waterGoal: 3000, // 3000mL
        calorieGoal: 2500,
        weeklyCaloriesConsumed: [],
        weeklyCaloriesBurned: [],
        nutritionEntries: []
      });
    } finally {
      setMetricsLoading(false);
    }
  };
    // Fetch today's nutrition data
  const fetchTodaysNutrition = async (token) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const response = await fetch('http://localhost:5057/api/Nutrition', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch nutrition data');
      
      const data = await response.json();
      
      // Filter for today's entries and calculate total calories
      const todaysEntries = data.filter(entry => 
        entry.consumptionDate.startsWith(today)
      );
        // Sum up calories
      let totalCalories = todaysEntries.reduce(
        (sum, entry) => sum + entry.caloriesConsumed, 0
      );
      
      return { totalCalories, entries: todaysEntries };
    } catch (err) {
      console.error('Error fetching nutrition data:', err);
      return { totalCalories: 0, entries: [] };
    }
  };
    // Fetch today's workouts
  const fetchTodaysWorkouts = async (token) => {
    try {
      const response = await fetch('http://localhost:5057/api/Workout', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch workout data');
      
      const data = await response.json();
      
      // Filter for today's workouts
      const today = new Date().toISOString().split('T')[0];
      const todaysWorkouts = data.filter(workout => 
        workout.date.startsWith(today)
      );
      
      // Extract calories burned from detailsJson if available
      let totalCaloriesBurned = 0;
      
      todaysWorkouts.forEach(workout => {        try {
          if (workout.detailsJson) {
            const details = JSON.parse(workout.detailsJson);
            if (details && details.caloriesBurned) {
              const calories = parseFloat(details.caloriesBurned);
              if (!isNaN(calories)) {
                totalCaloriesBurned += calories;
              }
            }
          }
        } catch (e) {
          console.error('Error parsing workout details:', e);
        }
      });
      
      return { totalCaloriesBurned, workouts: todaysWorkouts };
    } catch (err) {
      console.error('Error fetching workout data:', err);
      return { totalCaloriesBurned: 0, workouts: [] };
    }
  };
  
  // Fetch latest sleep tracking data
  const fetchLatestSleep = async (token) => {
    try {
      const response = await fetch('http://localhost:5057/api/SleepTracking/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch sleep data');
      
      const data = await response.json();
      
      // Get the latest sleep entry
      if (data && data.length > 0) {
        const latestSleep = data[0]; // Assuming they're ordered by date desc
        const hoursSlept = latestSleep.hoursSlept || 0;
        
        // Convert decimal hours to hours and minutes
        const hours = Math.floor(hoursSlept);
        const minutes = Math.round((hoursSlept - hours) * 60);
        
        return { hours, minutes, data: latestSleep };
      }
      
      return { hours: 0, minutes: 0, data: null };
    } catch (err) {
      console.error('Error fetching sleep data:', err);
      return { hours: 0, minutes: 0, data: null };
    }
  };
    // Fetch today's water intake
  const fetchTodaysWaterIntake = async (token) => {
    try {
      const response = await fetch('http://localhost:5057/api/WaterIntake/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch water intake data');
      
      const data = await response.json();
      
      // Filter for today's entries and calculate total water intake
      const today = new Date().toISOString().split('T')[0];
      const todaysEntries = data.filter(entry => 
        entry.intakeTime.startsWith(today)
      );
        // Calculate total amount in milliliters
      const totalAmountML = todaysEntries.reduce(
        (sum, entry) => sum + entry.amount, 0
      );
      
      return { totalAmountML, entries: todaysEntries };    } catch (err) {
      console.error('Error fetching water intake data:', err);
      return { totalAmountML: 0, entries: [] };
    }
  };
  // Fetch weekly nutrition data
  const fetchWeeklyNutrition = async (token) => {
    try {
      const response = await fetch('http://localhost:5057/api/Nutrition/summary?days=7', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch weekly nutrition data');
      
      const data = await response.json();
      
      // Create an array for the past 7 days, starting from Monday
      const weeklyData = Array(7).fill(0);
      const today = new Date();
      
      // Ensure we're working with the current week
      // Get the start of the week (Monday)
      const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const mondayOffset = currentDay === 0 ? 6 : currentDay - 1;
      const monday = new Date(today);
      monday.setDate(today.getDate() - mondayOffset);
      
      // Set time to start of day to avoid timezone issues
      monday.setHours(0, 0, 0, 0);
      
      console.log("Week starting Monday:", monday.toISOString());
      
      // Map data to the correct days of the week (Monday-based indexing)
      data.forEach(dayData => {
        // Parse the date and set time to midnight for accurate comparison
        const entryDate = new Date(dayData.date);
        entryDate.setHours(0, 0, 0, 0);
        
        // Only include data from this week
        if (entryDate >= monday && entryDate <= today) {
          // Calculate day index (0 = Monday, 6 = Sunday)
          const dayIndex = entryDate.getDay() === 0 ? 6 : entryDate.getDay() - 1;
          
          console.log(`Nutrition data for ${entryDate.toISOString().split('T')[0]} (index ${dayIndex}): ${dayData.total}`);
          
          weeklyData[dayIndex] = dayData.total;
        }
      });
      
      console.log("Weekly nutrition data:", weeklyData);
      return weeklyData;
    } catch (err) {
      console.error('Error fetching weekly nutrition data:', err);
      // Return empty data instead of fake data to avoid confusion
      return Array(7).fill(0);
    }
  };
  
  // Fetch weekly workout data
  const fetchWeeklyWorkouts = async (token) => {
    try {
      const response = await fetch('http://localhost:5057/api/Workout/summary?days=7', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch weekly workout data');
      
      const data = await response.json();
      
      // Create an array for the past 7 days, starting from Monday
      const weeklyData = Array(7).fill(0);
      const today = new Date();
      
      // Get the start of the week (Monday)
      const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const mondayOffset = currentDay === 0 ? 6 : currentDay - 1;
      const monday = new Date(today);
      monday.setDate(today.getDate() - mondayOffset);
      
      // Set time to start of day to avoid timezone issues
      monday.setHours(0, 0, 0, 0);
      
      console.log("Week starting Monday (workouts):", monday.toISOString());
      
      // Map data to the correct days of the week
      data.forEach(dayData => {
        // Parse the date and set time to midnight for accurate comparison
        const entryDate = new Date(dayData.date);
        entryDate.setHours(0, 0, 0, 0);
        
        // Only include data from this week
        if (entryDate >= monday && entryDate <= today) {
          // Calculate day index (0 = Monday, 6 = Sunday)
          const dayIndex = entryDate.getDay() === 0 ? 6 : entryDate.getDay() - 1;
          
          console.log(`Workout data for ${entryDate.toISOString().split('T')[0]} (index ${dayIndex}): ${dayData.total}`);
          
          weeklyData[dayIndex] = dayData.total;
        }
      });
      
      console.log("Weekly workout data:", weeklyData);
      return weeklyData;
    } catch (err) {
      console.error('Error fetching weekly workout data:', err);
      // Return empty data instead of fake data
      return Array(7).fill(0);
    }
  };
  
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
  }  // Prepare data for ProfileOverview widget
  const mergedUserData = { ...user, ...userProfile };
  
  // Calculate BMI if height and weight are available
  let bmi = null;
  if (mergedUserData.height && mergedUserData.weight) {
    // BMI formula: weight(kg) / (height(m))²
    const heightInMeters = mergedUserData.height / 100; // Convert cm to meters
    bmi = mergedUserData.weight / (heightInMeters * heightInMeters);
    bmi = parseFloat(bmi.toFixed(1)); // Round to 1 decimal place
  }
  
  // Prepare user data for display
  const userData = {
    firstName: mergedUserData.firstName || 'User',
    lastName: mergedUserData.lastName || '',
    username: mergedUserData.username || `${mergedUserData.firstName || ''} ${mergedUserData.lastName || ''}`.trim(),
    email: mergedUserData.email || '',
    isVerified: true, // Default to true for now
    weight: mergedUserData.weight || null,
    fitnessGoal: mergedUserData.fitnessGoal || 'Not specified',
    bmi: bmi,
    height: mergedUserData.height || null,
  };
  return (
    <div className="dashboard-home">
      <div className="dashboard-container" style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
        {/* Profile Overview Widget */}
        <div className="profile-widget-container" style={{width: "96%"}}>
          <ProfileOverview userData={userData} />
        </div>
          {/* Health Metrics Widgets */}
        <div className="health-widgets-grid">
          {metricsLoading ? (
            <div className="health-metrics-loading">Loading health metrics...</div>
          ) : (
            <>
              <div className="widget-item calories-consumed">
                <CaloriesConsumed calories={healthMetrics.caloriesConsumed} />
              </div>
              <div className="widget-item calories-burned">
                <CaloriesBurned calories={healthMetrics.caloriesBurned} />
              </div>
              <div className="widget-item sleep-tracking">
                <SleepTracking hours={healthMetrics.sleepHours} minutes={healthMetrics.sleepMinutes} />
              </div>
              <div className="widget-item water-intake">
                <WaterIntake amount={healthMetrics.waterIntake} goal={healthMetrics.waterGoal} />
              </div>
            </>
          )}
        </div>
          {/* Weekly Widgets */}
        <div className="weekly-widget-container">
          {metricsLoading ? (
            <div className="health-metrics-loading">Loading weekly data...</div>
          ) : (
            <>
              <div className="widget-item weekly-calories-consumed">                <WeeklyCaloriesConsumed 
                  goal={healthMetrics.calorieGoal} 
                  current={healthMetrics.caloriesConsumed} 
                  weeklyData={healthMetrics.weeklyCaloriesConsumed} 
                />
              </div>
              <div className="widget-item weekly-calories-burned">                <WeeklyCaloriesBurned 
                  goal={500} 
                  current={healthMetrics.caloriesBurned} 
                  weeklyData={healthMetrics.weeklyCaloriesBurned} 
                />
              </div>
            </>
          )}
        </div>
          
        {/* Nutrition Pie Chart */}
        <div className="nutrition-pie-container">
          {metricsLoading ? (
            <div className="health-metrics-loading">Loading nutrition data...</div>
          ) : (
            <div className="widget-item nutrition-pie">
              <NutritionPieChart nutritionData={healthMetrics.nutritionEntries} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;