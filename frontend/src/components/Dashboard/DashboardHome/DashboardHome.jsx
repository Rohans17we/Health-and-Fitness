import React from 'react';
import { FaFire, FaHeartbeat, FaWalking, FaRunning, FaWater, FaBed } from 'react-icons/fa';
import './DashboardHome.css';

const DashboardHome = ({ user }) => {
  // Mock data - will be replaced with API calls in the future
  const healthData = {
    calories: {
      consumed: 1750,
      burned: 1850,
      goal: 2500,
      weeklyTotal: 13886
    },
    heartRate: {
      current: 72,
      max: 120,
      min: 58,
      average: 68
    },
    steps: {
      today: 7930,
      goal: 8000,
      weeklyTotal: 13940
    },
    activity: {
      minutes: 450,
      goal: 30,
      timesThisMonth: 15
    },
    sleep: {
      hours: 6,
      minutes: 45,
      goal: 8
    },
    hydration: {
      current: 2.5,
      goal: 3
    },
    weight: {
      current: 75.5,
      goal: 64.5
    },
    bmi: {
      value: 24.3,
      status: 'Healthy'
    },
    bodyFat: {
      percentage: 18
    }
  };

  // Format time (6h 45m)
  const formatTime = (hours, minutes) => {
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="dashboard-home">
      <div className="dashboard-overview">
        <h2>Overview</h2>
        <div className="user-profile">
          <div className="user-avatar">
            {user?.profilePic ? (
              <img src={user.profilePic} alt={user.firstName} />
            ) : (
              <div className="avatar-placeholder">
                {user?.firstName?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          <div className="user-info">
            <p className="user-label">Username</p>
            <h2 className="user-name">{user?.firstName} {user?.lastName} <span className="online-indicator"></span></h2>
            
            <div className="user-metrics">
              <div className="metric">
                <p className="metric-label">Weight</p>
                <p className="metric-value">{healthData.weight.current} <span className="metric-unit">kg</span></p>
              </div>
              
              <div className="metric">
                <p className="metric-label">Goal</p>
                <p className="metric-value">{healthData.weight.goal} <span className="metric-unit">kg</span></p>
              </div>
              
              <div className="metric">
                <p className="metric-label">BMI</p>
                <p className="metric-value">{healthData.bmi.value} <span className="metric-status">{healthData.bmi.status}</span></p>
              </div>
              
              <div className="metric">
                <p className="metric-label">Body Fat</p>
                <p className="metric-value">{healthData.bodyFat.percentage}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-statistics">
        <div className="statistics-header">
          <h2>Statistics</h2>
          <p className="time-period">This month</p>
        </div>
        
        <div className="statistics-grid">
          <div className="statistic-card">
            <div className="statistic-header">
              <div className="statistic-icon calories">
                <FaFire />
              </div>
              <p>Calories</p>
            </div>
            <div className="statistic-value">
              <h3>{healthData.calories.consumed} <span className="statistic-goal">/{healthData.calories.goal}kcal</span></h3>
            </div>
            <div className="statistic-chart">
              <p className="chart-label">This Week</p>
              <p className="chart-value">{healthData.calories.weeklyTotal} kcal</p>
              <div className="bar-chart">
                {/* Simplified bar chart for demonstration */}
                {[0.4, 0.7, 0.9, 0.5, 0.6, 0.3, 0.8].map((height, index) => (
                  <div 
                    key={index} 
                    className="bar" 
                    style={{ height: `${height * 100}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="statistic-card">
            <div className="statistic-header">
              <div className="statistic-icon heart-rate">
                <FaHeartbeat />
              </div>
              <p>Heart Rate</p>
            </div>
            <div className="statistic-value">
              <h3>{healthData.heartRate.current} <span className="statistic-unit">bpm</span></h3>
            </div>
            <div className="statistic-chart">
              <p className="chart-label">Today 00.00 to 24.00</p>
              <div className="line-chart">
                {/* Simplified heart rate chart for demonstration */}
                <div className="heart-rate-chart">
                  {Array(24).fill().map((_, index) => (
                    <div 
                      key={index} 
                      className="heart-rate-point" 
                      style={{ 
                        height: `${Math.random() * 80 + 20}%`,
                        left: `${index * (100/24)}%`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="statistic-card">
            <div className="statistic-header">
              <div className="statistic-icon steps">
                <FaWalking />
              </div>
              <p>Steps</p>
            </div>
            <div className="statistic-value">
              <h3>{healthData.steps.today} <span className="statistic-goal">/{healthData.steps.goal}steps</span></h3>
            </div>
            <div className="statistic-chart">
              <p className="chart-label">This Week</p>
              <p className="chart-value">{healthData.steps.weeklyTotal} steps</p>
              <div className="bar-chart">
                {/* Simplified bar chart for demonstration */}
                {[0.3, 0.5, 0.8, 0.4, 0.6, 0.7, 0.9].map((height, index) => (
                  <div 
                    key={index} 
                    className="bar" 
                    style={{ height: `${height * 100}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="statistic-card">
            <div className="statistic-header">
              <div className="statistic-icon activity">
                <FaRunning />
              </div>
              <p>Moving</p>
            </div>
            <div className="statistic-value">
              <h3>{healthData.activity.minutes} <span className="statistic-goal">/{healthData.activity.goal}mins</span></h3>
            </div>
            <div className="statistic-chart">
              <p className="chart-label">This Month</p>
              <p className="chart-value">{healthData.activity.timesThisMonth} times</p>
              <div className="dot-chart">
                {/* Simplified dot chart for demonstration */}
                <div className="dot-grid">
                  {Array(30).fill().map((_, index) => (
                    <div 
                      key={index} 
                      className={`dot ${Math.random() > 0.5 ? 'active' : ''}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="statistics-grid secondary">
          <div className="statistic-card horizontal">
            <div className="statistic-header">
              <div className="statistic-icon calories-consumed">
                <FaFire />
              </div>
              <p>Calories Consumed</p>
            </div>
            <div className="statistic-value">
              <h3>{healthData.calories.consumed}<span className="statistic-unit">/kcal</span></h3>
            </div>
          </div>
          
          <div className="statistic-card horizontal">
            <div className="statistic-header">
              <div className="statistic-icon calories-burned">
                <FaFire />
              </div>
              <p>Calories Burned</p>
            </div>
            <div className="statistic-value">
              <h3>{healthData.calories.burned}<span className="statistic-unit">/kcal</span></h3>
            </div>
          </div>
          
          <div className="statistic-card horizontal">
            <div className="statistic-header">
              <div className="statistic-icon sleep">
                <FaBed />
              </div>
              <p>Sleep Tracking</p>
            </div>
            <div className="statistic-value">
              <h3>{formatTime(healthData.sleep.hours, healthData.sleep.minutes)}</h3>
            </div>
          </div>
          
          <div className="statistic-card horizontal">
            <div className="statistic-header">
              <div className="statistic-icon hydration">
                <FaWater />
              </div>
              <p>Hydration</p>
            </div>
            <div className="statistic-value">
              <h3>{healthData.hydration.current}L<span className="statistic-goal">/{healthData.hydration.goal}L Goal</span></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;