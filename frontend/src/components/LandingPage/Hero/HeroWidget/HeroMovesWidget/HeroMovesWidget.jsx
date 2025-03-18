import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { IoFlash } from 'react-icons/io5';
import './HeroMovesWidget.css';

const HeroMovesWidget = () => {
  // Sample data for the monthly activity
  const data = [
    { name: '1', value: 10 },
    { name: '2', value: 30 },
    { name: '3', value: 45 },
    { name: '4', value: 60 },
    { name: '5', value: 80 },
    { name: '6', value: 50 },
    { name: '7', value: 65 },
    { name: '8', value: 75 },
    { name: '9', value: 55 },
    { name: '10', value: 65 },
    { name: '11', value: 40 },
    { name: '12', value: 50 }
  ];

  return (
    <div className="HeroMovesWidget-container">
      <div className="HeroMovesWidget-header">
        <div className="HeroMovesWidget-title">
          <IoFlash className="HeroMovesWidget-icon" />
          <span>Move</span>
        </div>
        <div className="HeroMovesWidget-period">
          <span>Monthly</span>
          <svg className="HeroMovesWidget-dropdown" width="12" height="12" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </div>
      
      <div className="HeroMovesWidget-chart">
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis dataKey="name" hide={true} />
            <YAxis hide={true} />
            <Bar 
              dataKey="value" 
              fill="#ff3b30" 
              radius={[5, 5, 5, 5]} 
              background={{ fill: '#ffebe9', radius: [5, 5, 5, 5] }}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HeroMovesWidget;