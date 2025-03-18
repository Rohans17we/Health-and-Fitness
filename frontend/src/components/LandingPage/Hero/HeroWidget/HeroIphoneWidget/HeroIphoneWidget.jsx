import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { IoFootstepsOutline, IoFlameOutline, IoLocationOutline } from 'react-icons/io5';
import { FaWalking, FaRunning, FaBiking, FaEllipsisH } from 'react-icons/fa';
import './HeroIphoneWidget.css';

const HeroIphoneWidget = ({ 
  stepsProgress = 80, 
  caloriesProgress = 75, 
  distanceProgress = 90 
}) => {
  const stepsData = [
    { name: 'Completed', value: stepsProgress },
    { name: 'Remaining', value: 100 - stepsProgress }
  ];
  
  const caloriesData = [
    { name: 'Completed', value: caloriesProgress },
    { name: 'Remaining', value: 100 - caloriesProgress }
  ];
  
  const distanceData = [
    { name: 'Completed', value: distanceProgress },
    { name: 'Remaining', value: 100 - distanceProgress }
  ];

  const COLORS = {
    steps: '#8a4fff',
    calories: '#ff9d4a',
    distance: '#4cd964'
  };

  return (
    <div className="HeroIphoneWidget-container">
      <div className="HeroIphoneWidget-rings">
        <PieChart width={200} height={200}>
          {/* Steps Ring - Outer */}
          <Pie
            data={stepsData}
            cx={100}
            cy={100}
            startAngle={90}
            endAngle={-270}
            innerRadius={85}
            outerRadius={95}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell key="steps-completed" fill={COLORS.steps} />
            <Cell key="steps-remaining" fill="#e0e0e0" />
          </Pie>
          
          {/* Calories Ring - Middle */}
          <Pie
            data={caloriesData}
            cx={100}
            cy={100}
            startAngle={90}
            endAngle={-270}
            innerRadius={65}
            outerRadius={75}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell key="calories-completed" fill={COLORS.calories} />
            <Cell key="calories-remaining" fill="#e0e0e0" />
          </Pie>
          
          {/* Distance Ring - Inner */}
          <Pie
            data={distanceData}
            cx={100}
            cy={100}
            startAngle={90}
            endAngle={-270}
            innerRadius={45}
            outerRadius={55}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell key="distance-completed" fill={COLORS.distance} />
            <Cell key="distance-remaining" fill="#e0e0e0" />
          </Pie>
        </PieChart>
        
      </div>

      <div className="HeroIphoneWidget-metrics">
        <div className="HeroIphoneWidget-metric">
          <div className="HeroIphoneWidget-metricIcon steps">
            <IoFootstepsOutline />
          </div>
          <div className="HeroIphoneWidget-metricLabel">Steps</div>
          <div className="HeroIphoneWidget-metricValue">507</div>
        </div>
        
        <div className="HeroIphoneWidget-metric">
          <div className="HeroIphoneWidget-metricIcon calories">
            <IoFlameOutline />
          </div>
          <div className="HeroIphoneWidget-metricLabel">Cal</div>
          <div className="HeroIphoneWidget-metricValue">507kcal</div>
        </div>
        
        <div className="HeroIphoneWidget-metric">
          <div className="HeroIphoneWidget-metricIcon distance">
            <IoLocationOutline />
          </div>
          <div className="HeroIphoneWidget-metricLabel">Distance</div>
          <div className="HeroIphoneWidget-metricValue">5km</div>
        </div>
      </div>

      <div className="HeroIphoneWidget-buttons">
        <button className="HeroIphoneWidget-button">
          <FaWalking />
          <span className="HeroIphoneWidget-buttonLabel">Walking</span>
        </button>
        
        <button className="HeroIphoneWidget-button">
          <FaRunning />
          <span className="HeroIphoneWidget-buttonLabel">Running</span>
        </button>
        
        <button className="HeroIphoneWidget-button">
          <FaBiking />
          <span className="HeroIphoneWidget-buttonLabel">Cycling</span>
        </button>
        
        <button className="HeroIphoneWidget-button">
          <FaEllipsisH />
          <span className="HeroIphoneWidget-buttonLabel">More</span>
        </button>
      </div>
    </div>
  );
};

export default HeroIphoneWidget;