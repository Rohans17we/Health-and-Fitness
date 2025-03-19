import React, { useState, useEffect } from 'react';
import './DashboardAnalytics.css';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, BarChart, Bar 
} from 'recharts';

const DashboardAnalytics = () => {
  const [calorieComparisonData, setCalorieComparisonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const calorieComparisonResponse = await fetch('http://localhost:5057/api/Analytics/calorie-comparison', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (calorieComparisonResponse.ok) {
          const calorieComparisonResult = await calorieComparisonResponse.json();

          const formattedCalorieData = calorieComparisonResult.map(item => ({
            ...item,
            formattedDate: new Date(item.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })
          }));

          setCalorieComparisonData(formattedCalorieData);
          setError('');
        } else {
          setCalorieComparisonData([]);
          setError('No calorie comparison data available.');
        }
      } catch (err) {
        console.error('Error fetching calorie comparison data:', err);
        setError('Failed to fetch calorie comparison data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div className="analytics-loading">Loading analytics data...</div>;

  return (
    <div className="analytics-container">
      <h1>Your Fitness Analytics</h1>

      {/* ✅ Calorie Comparison Chart */}
      <div className="analytics-card chart-card">
        <h3>Calories Consumed vs. Burned</h3>
        {calorieComparisonData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={calorieComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="formattedDate" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="caloriesConsumed" name="Calories Consumed" fill="#8884d8" />
              <Bar dataKey="caloriesBurned" name="Calories Burned" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data-message">{error}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardAnalytics;