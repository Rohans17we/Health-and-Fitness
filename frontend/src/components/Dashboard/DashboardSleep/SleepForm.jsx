import React, { useState } from 'react';

const sleepQualities = ['Poor', 'Average', 'Good'];

const SleepForm = ({ onSubmit, onCancel }) => {
  const [hoursSlept, setHoursSlept] = useState('');
  const [sleepQuality, setSleepQuality] = useState('Average');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hoursSlept || isNaN(hoursSlept) || Number(hoursSlept) <= 0 || Number(hoursSlept) > 24) {
      alert('Please enter a valid number of hours (between 1 and 24)');
      return;
    }
    
    onSubmit({
      hoursSlept: Number(hoursSlept),
      sleepQuality,
      date: new Date(date).toISOString()
    });
    
    setHoursSlept('');
    setSleepQuality('Average');
  };

  return (
    <form className="sleep-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          max={new Date().toISOString().slice(0,10)}
        />
      </div>
      
      <div className="form-group">
        <label>Hours Slept</label>
        <input
          type="number"
          min="0.5"
          max="24"
          step="0.5"
          value={hoursSlept}
          onChange={e => setHoursSlept(e.target.value)}
          placeholder="e.g. 8"
        />
      </div>
      
      <div className="form-group">
        <label>Sleep Quality</label>
        <div className="sleep-quality-selector">
          {sleepQualities.map(quality => (
            <div 
              key={quality} 
              className={`quality-option ${quality.toLowerCase()} ${sleepQuality === quality ? 'selected' : ''}`}
              onClick={() => setSleepQuality(quality)}
            >
              {quality}
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <button type="submit" className="add-btn">Add</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default SleepForm;
