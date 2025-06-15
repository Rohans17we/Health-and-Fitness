import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './NutritionPieChart.css';

/**
 * NutritionPieChart displays a breakdown of macronutrients consumed for the day
 * @param {Object} props 
 * @param {Array} props.nutritionData - Array of nutrition entries for the day
 */
const NutritionPieChart = ({ nutritionData = [] }) => {
  const [macroData, setMacroData] = useState([]);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  useEffect(() => {
    if (nutritionData && nutritionData.length > 0) {
      processMacroData();
      setIsDataAvailable(true);
    } else {
      // Use sample data if no actual data is available
      setSampleData();
      setIsDataAvailable(false);
    }
  }, [nutritionData]);

  const processMacroData = () => {
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalFiber = 0;

    // Aggregate macros from all nutrition entries
    nutritionData.forEach(entry => {
      try {
        if (entry.detailsJson) {
          const details = JSON.parse(entry.detailsJson);
          totalProtein += parseFloat(details.protein || 0);
          totalCarbs += parseFloat(details.carbs || 0);
          totalFat += parseFloat(details.fat || 0);
          totalFiber += parseFloat(details.fiber || 0);
        }
      } catch (error) {
        console.error('Error parsing nutrition details:', error);
      }
    });

    // Only include macros with values > 0
    const data = [];
    if (totalProtein > 0) data.push({ name: 'Protein', value: totalProtein });
    if (totalCarbs > 0) data.push({ name: 'Carbs', value: totalCarbs });
    if (totalFat > 0) data.push({ name: 'Fat', value: totalFat });
    if (totalFiber > 0) data.push({ name: 'Fiber', value: totalFiber });

    // If we have no data with values > 0, use sample data
    if (data.length === 0) {
      setSampleData();
    } else {
      setMacroData(data);
    }
  };

  const setSampleData = () => {
    setMacroData([
      { name: 'Protein', value: 50 },
      { name: 'Carbs', value: 120 },
      { name: 'Fat', value: 35 },
      { name: 'Fiber', value: 15 }
    ]);
  };

  // Colors for each macro
  const COLORS = {
    Protein: '#FF6B6B',
    Carbs: '#4ECDC4',
    Fat: '#FFD166',
    Fiber: '#6A0572'
  };

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="nutrition-pie-tooltip">
          <p className="nutrition-pie-tooltip-label">{`${payload[0].name}: ${payload[0].value.toFixed(1)}g`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend that includes the percentage
  const CustomLegend = ({ payload }) => {
    const totalValue = macroData.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <ul className="nutrition-pie-legend">
        {payload.map((entry, index) => {
          const percentage = totalValue > 0 
            ? Math.round((entry.payload.value / totalValue) * 100) 
            : 0;
            
          return (
            <li key={`item-${index}`} className="nutrition-pie-legend-item">
              <div className="nutrition-pie-legend-icon" style={{ backgroundColor: entry.color }}></div>
              <div className="nutrition-pie-legend-text">
                <span className="nutrition-pie-legend-name">{entry.value}</span>
                <span className="nutrition-pie-legend-value">{entry.payload.value.toFixed(1)}g</span>
                <span className="nutrition-pie-legend-percentage">({percentage}%)</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="nutrition-pie-chart-container">
      <h3 className="nutrition-pie-chart-title">
        Today's Nutrition Breakdown
        {!isDataAvailable && <span className="sample-data-note">Sample Data</span>}
      </h3>
      
      <div className="nutrition-pie-chart-content">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={macroData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
            >
              {macroData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[entry.name] || '#AAAAAA'} 
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              content={<CustomLegend />}
              layout="vertical"
              verticalAlign="middle" 
              align="right"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NutritionPieChart;
