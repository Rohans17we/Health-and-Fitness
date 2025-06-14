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
        // Get data for the last 7 days
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6); // Last 7 days including today
        
        // Format dates for API        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        
        const response = await axios.get(`http://localhost:5057/api/Workout/summary?days=7`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json'
          }
        });
        
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
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = [];
    
    // Create a map of existing data points
    const dataMap = {};
    data.forEach(item => {
      dataMap[item.date] = item.total;
    });
    
    // Fill in all days in the range
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayName = dayNames[currentDate.getDay()];
      
      result.push({
        date: dateStr,
        day: dayName,
        calories: dataMap[dateStr] || 0
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
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
          <Bar dataKey="calories" name="Calories Burned" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyCaloriesChart;
