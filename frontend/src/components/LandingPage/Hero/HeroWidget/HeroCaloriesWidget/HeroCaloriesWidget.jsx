import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { IoFlash } from 'react-icons/io5';
import './HeroCaloriesWidget.css';

const HeroCaloriesWidget = ({ calories = 520 }) => {
  // Data for the circular progress
  const data = [
    { name: 'Completed', value: 65 },
    { name: 'Remaining', value: 35 }
  ];

  return (
    <div className="HeroCaloriesWidget-container">
      <div className="HeroCaloriesWidget-header">
        <div className="HeroCaloriesWidget-title">
          <IoFlash className="HeroCaloriesWidget-icon" />
          <span>Calories</span>
        </div>
      </div>
      
      <div className="HeroCaloriesWidget-chart">
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={45}
              endAngle={-315}
              innerRadius={60}
              outerRadius={70}
              paddingAngle={0}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell key="completed" fill="#ff9d4a" />
              <Cell key="remaining" fill="#ffebe9" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="HeroCaloriesWidget-value">
          <div className="HeroCaloriesWidget-number">{calories}</div>
          <div className="HeroCaloriesWidget-unit">/kcal</div>
        </div>
      </div>
    </div>
  );
};

export default HeroCaloriesWidget;