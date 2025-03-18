import React, { useState, useEffect } from 'react';
import './DashboardHome.css';
import StatCard from './StatCard';
import HealthMetrics from './HealthMetrics';
import ActivityChart from './ActivityChart';
import RecentActivities from './RecentActivities';
import WaterIntakeTracker from './WaterIntakeTracker';
import NutritionSummary from './NutritionSummary';

const DashboardHome = () => {
  const [healthData, setHealthData] = useState({
    weight: 75.5,
    height: 175,  // Added height in cm
    goalWeight: 64.5,
    bmi: 24.3,
    bodyFat: 18,
    heartRate: 72,
    steps: 8450,
    caloriesBurned: 450,
    waterIntake: 1.8,
    sleepHours: 7.5
  });
  
  // You can fetch real data from your API here
  useEffect(() => {
    // Example API call
    // const fetchHealthData = async () => {
    //   try {
    //     const response = await fetch('/api/health-data');
    //     const data = await response.json();
    //     setHealthData(data);
    //   } catch (error) {
    //     console.error('Error fetching health data:', error);
    //   }
    // };
    // fetchHealthData();
  }, []);

  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="date-filter">
          <span>This month</span>
        </div>
      </div>
      
      
      <div className="stats-container">
        <StatCard 
          title="Weight" 
          value={healthData.weight} 
          unit="kg" 
          goal={healthData.goalWeight}
          icon="weight"
        />
        <StatCard 
          title="Height" 
          value={healthData.height || 175} 
          unit="cm" 
          icon="height"
        />
        <StatCard 
          title="BMI" 
          value={healthData.bmi} 
          status={healthData.bmi < 25 ? "Healthy" : "Overweight"}
          icon="bmi"
        />
        <StatCard 
          title="Body Fat" 
          value={healthData.bodyFat} 
          unit="%" 
          icon="bodyFat"
        />
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card health-metrics">
          <HealthMetrics 
            heartRate={healthData.heartRate} 
            steps={healthData.steps} 
            caloriesBurned={healthData.caloriesBurned} 
          />
        </div>
        
        <div className="dashboard-card activity-chart">
          <ActivityChart />
        </div>
        
        <div className="dashboard-card water-intake">
          <WaterIntakeTracker value={healthData.waterIntake} goal={2.5} />
        </div>
        
        <div className="dashboard-card nutrition-summary">
          <NutritionSummary />
        </div>
        
        <div className="dashboard-card recent-activities">
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;