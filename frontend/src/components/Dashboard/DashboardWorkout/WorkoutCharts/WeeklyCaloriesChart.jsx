import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const WeeklyCaloriesChart = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyCaloriesData = async () => {
      try {
        setLoading(true);
        
        // Get today's date
        const today = new Date();
        
        // Calculate Monday of current week for consistency with other components
        const currentDay = today.getDay();
        const mondayOffset = currentDay === 0 ? 6 : currentDay - 1;
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - mondayOffset);
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);
        
        console.log(`Fetching workout data from ${startDate.toISOString()} to ${endDate.toISOString()}`);
        
        const response = await axios.get(`http://localhost:5057/api/Workout/summary?days=7`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json'
          }
        });
        
        console.log('API response:', response.data);
        
        // Process the data to ensure we have entries for all 7 days
        const processedData = processDataForAllDays(response.data, startDate, endDate);
        setWeeklyData(processedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching weekly calories data:', err);
        setError('Failed to load weekly calories data');
        setLoading(false);
      }
    };

    fetchWeeklyCaloriesData();
  }, []);

  // Helper function to ensure we have data points for all 7 days
  const processDataForAllDays = (data, startDate, endDate) => {
    // Use Monday-Sunday format to be consistent with other components
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const result = [];
    
    // Create a map of existing data points
    const dataMap = {};
    data.forEach(item => {
      dataMap[item.date] = item.total;
    });
    
    // Get the start of the week (Monday)
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const mondayOffset = currentDay === 0 ? 6 : currentDay - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - mondayOffset);
    monday.setHours(0, 0, 0, 0);
    
    console.log("Chart - Week starting Monday:", monday.toISOString());
    
    // Fill in all days in the range (Monday to Sunday)
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(monday);
      currentDate.setDate(monday.getDate() + i);
      
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayIndex = currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;
      const dayName = dayNames[dayIndex];
      
      const calories = dataMap[dateStr] || 0;
      console.log(`Chart data for ${dateStr} (${dayName}): ${calories}`);
      
      result.push({
        date: dateStr,
        day: dayName,
        calories: calories
      });
    }
    
    return result;
  };

  if (loading) return <div>Loading weekly calories data...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="weekly-calories-chart">
      <h3>Weekly Calories Burned</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={weeklyData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value} calories`, 'Calories Burned']}
            labelFormatter={(label) => `Day: ${label}`}
          />
          <Legend />
          <Bar dataKey="calories" name="Calories Burned" fill="#ff5e3a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyCaloriesChart;
