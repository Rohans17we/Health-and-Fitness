import React from 'react';
import { BsMoon } from 'react-icons/bs';
import './SleepTracking.css';

/**
 * SleepTracking widget displays the amount of sleep the user got
 * @param {Object} props
 * @param {number} props.hours - Hours of sleep
 * @param {number} props.minutes - Minutes of sleep (in addition to hours)
 * @param {number} props.goal - Sleep goal in hours (optional)
 */
const SleepTracking = ({ hours = 0, minutes = 0, goal }) => {
  // Format sleep time
  const displayHours = Math.floor(hours);
  const displayMinutes = Math.floor(minutes);
  
  // Format for display
  const formattedTime = `${displayHours}h ${displayMinutes}m`;
  
  return (
    <div className="sleep-tracking-widget">      <div className="sleep-tracking-icon">
        <BsMoon />
      </div>
      <div className="sleep-tracking-label">Sleep Tracking</div>
      <div className="sleep-tracking-divider"></div>
      <div className="sleep-tracking-value">
        {formattedTime}
      </div>
      {goal && (
        <div className="sleep-tracking-goal">
          Goal: {goal} hours
        </div>
      )}
    </div>
  );
};

export default SleepTracking;