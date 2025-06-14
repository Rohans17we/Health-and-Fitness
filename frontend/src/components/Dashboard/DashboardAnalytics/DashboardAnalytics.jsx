import React, { useState, useEffect } from 'react';
import './DashboardAnalytics.css';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const AnimatedNumber = ({ value }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 800;
    const step = (timestamp) => {
      if (start === 0) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value);
    };
    requestAnimationFrame(step);
    // eslint-disable-next-line
  }, [value]);
  return <span className="animated-number">{display.toLocaleString()}</span>;
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c', '#d0ed57', '#8dd1e1'];

const DashboardAnalytics = () => {
  const [calorieComparisonData, setCalorieComparisonData] = useState([]);
  const [nutritionSummary, setNutritionSummary] = useState([]);
  const [waterSummary, setWaterSummary] = useState({ total: 0, daily: [] });
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

        // Fetch nutrition summary
        const nutritionSummaryResponse = await fetch('http://localhost:5057/api/Analytics/nutrition-summary', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        let nutritionSummaryResult = [];
        if (nutritionSummaryResponse.ok) {
          nutritionSummaryResult = await nutritionSummaryResponse.json();
          console.log('Nutrition summary:', nutritionSummaryResult); // Debug log
        } else {
          console.log('Nutrition summary fetch failed:', nutritionSummaryResponse.status);
        }
        setNutritionSummary(nutritionSummaryResult);

        // Fetch water intake summary
        const waterSummaryResponse = await fetch('http://localhost:5057/api/Analytics/water-summary', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (waterSummaryResponse.ok) {
          const waterSummaryResult = await waterSummaryResponse.json();
          setWaterSummary(waterSummaryResult);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const totalConsumed = calorieComparisonData.reduce((sum, d) => sum + (d.caloriesConsumed || 0), 0);
  const totalBurned = calorieComparisonData.reduce((sum, d) => sum + (d.caloriesBurned || 0), 0);

  // Nutrition summary totals
  const totalMacros = nutritionSummary.reduce((acc, d) => {
    acc.protein += d.protein || 0;
    acc.carbs += d.carbs || 0;
    acc.fat += d.fat || 0;
    acc.fiber += d.fiber || 0;
    acc.sugar += d.sugar || 0;
    return acc;
  }, { protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 });
  // Meal type breakdown
  const mealTypeCounts = nutritionSummary.reduce((acc, d) => {
    if (d.mealTypes) {
      Object.entries(d.mealTypes).forEach(([type, count]) => {
        acc[type] = (acc[type] || 0) + count;
      });
    }
    return acc;
  }, {});
  const mealTypeData = Object.entries(mealTypeCounts).map(([type, value]) => ({ name: type, value }));

  if (loading) return <div className="analytics-loading">Loading analytics data...</div>;

  return (
    <div className="analytics-container">
      <h1>Your Fitness Analytics</h1>
      <div className="analytics-summary">
        <div className="analytics-card summary-card consumed">
          <h3>Total Calories Consumed</h3>
          <span className="calories-consumed"><AnimatedNumber value={totalConsumed} /></span>
        </div>
        <div className="analytics-card summary-card burned">
          <h3>Total Calories Burned</h3>
          <span className="calories-burned"><AnimatedNumber value={totalBurned} /></span>
        </div>
        <div className="analytics-card summary-card macros">
          <h3>Total Macros</h3>
          <div className="macro-row">
            <span>Protein: <b>{totalMacros.protein.toFixed(1)}g</b></span>
            <span>Carbs: <b>{totalMacros.carbs.toFixed(1)}g</b></span>
            <span>Fat: <b>{totalMacros.fat.toFixed(1)}g</b></span>
            <span>Fiber: <b>{totalMacros.fiber.toFixed(1)}g</b></span>
            <span>Sugar: <b>{totalMacros.sugar.toFixed(1)}g</b></span>
          </div>
        </div>
        <div className="analytics-card summary-card water">
          <h3>Total Water Intake</h3>
          <span className="water-intake-total"><AnimatedNumber value={waterSummary.total} /></span>
          <span style={{fontSize:'1rem',color:'#38bdf8',fontWeight:500}}>ml</span>
        </div>
      </div>
      {/* Area Chart for trends */}
      <div className="analytics-card chart-card">
        <h3>Calories Trend</h3>
        {calorieComparisonData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={calorieComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorConsumed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBurned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="formattedDate" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="caloriesConsumed" name="Calories Consumed" stroke="#8884d8" fillOpacity={1} fill="url(#colorConsumed)" animationDuration={1200}/>
              <Area type="monotone" dataKey="caloriesBurned" name="Calories Burned" stroke="#82ca9d" fillOpacity={1} fill="url(#colorBurned)" animationDuration={1200}/>
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data-message">{error}</p>
        )}
      </div>
      {/* Bar Chart for comparison */}
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
              <Bar dataKey="caloriesConsumed" name="Calories Consumed" fill="#8884d8" animationDuration={1000}/>
              <Bar dataKey="caloriesBurned" name="Calories Burned" fill="#82ca9d" animationDuration={1000}/>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data-message">{error}</p>
        )}
      </div>
      {/* Macro trend chart */}
      <div className="analytics-card chart-card">
        <h3>Macros Trend</h3>
        {nutritionSummary.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={nutritionSummary} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="protein" name="Protein (g)" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
              <Area type="monotone" dataKey="carbs" name="Carbs (g)" stroke="#ffc658" fill="#ffc658" fillOpacity={0.2} />
              <Area type="monotone" dataKey="fat" name="Fat (g)" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
              <Area type="monotone" dataKey="fiber" name="Fiber (g)" stroke="#a4de6c" fill="#a4de6c" fillOpacity={0.2} />
              <Area type="monotone" dataKey="sugar" name="Sugar (g)" stroke="#ff7f50" fill="#ff7f50" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data-message">No macro data available.</p>
        )}
      </div>
      {/* Meal type breakdown pie chart */}
      <div className="analytics-card chart-card">
        <h3>Meal Type Breakdown</h3>
        {mealTypeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={mealTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {mealTypeData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data-message">No meal type data available.</p>
        )}
      </div>
      {/* Water Intake Trend Chart */}
      <div className="analytics-card chart-card">
        <h3>Water Intake Trend</h3>
        {waterSummary.daily && waterSummary.daily.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={waterSummary.daily} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="total" name="Water Intake (ml)" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data-message">No water intake data available.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardAnalytics;