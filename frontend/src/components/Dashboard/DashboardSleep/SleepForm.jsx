import React, { useState, useEffect } from 'react';

const SleepForm = ({ onSubmit, onCancel }) => {
  const [sleepStart, setSleepStart] = useState('');
  const [sleepEnd, setSleepEnd] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [hoursSlept, setHoursSlept] = useState('');
  
  useEffect(() => {
    if (sleepStart && sleepEnd) {
      try {
        const start = new Date(`${date}T${sleepStart}`);
        const end = new Date(`${date}T${sleepEnd}`);
        
        // If end time is earlier than start time, assume it's the next day
        if (end < start) {
          const nextDay = new Date(end);
          nextDay.setDate(nextDay.getDate() + 1);
          end.setTime(nextDay.getTime());
        }
        
        // Calculate hours difference
        const diffMs = end - start;
        const diffHrs = diffMs / (1000 * 60 * 60);
        setHoursSlept(diffHrs.toFixed(1));
      } catch (error) {
        setHoursSlept('');
      }
    }
  }, [sleepStart, sleepEnd, date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sleepStart || !sleepEnd) {
      alert('Please select both sleep start and end times');
      return;
    }
    
    // Create date objects for the start and end times
    const sleepStartDateTime = new Date(`${date}T${sleepStart}`);
    let sleepEndDateTime = new Date(`${date}T${sleepEnd}`);
    
    // If end time is earlier than start time, assume it's the next day
    if (sleepEndDateTime < sleepStartDateTime) {
      sleepEndDateTime.setDate(sleepEndDateTime.getDate() + 1);
    }
    
    onSubmit({
      sleepStart: sleepStartDateTime.toISOString(),
      sleepEnd: sleepEndDateTime.toISOString(),
      hoursSlept: parseFloat(hoursSlept),
      date: new Date(date).toISOString()
    });
    
    setSleepStart('');
    setSleepEnd('');
    setHoursSlept('');
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
      
      <div className="form-row">
        <div className="form-group half">
          <label>Sleep Start Time</label>
          <input
            type="time"
            value={sleepStart}
            onChange={e => setSleepStart(e.target.value)}
          />
        </div>
        
        <div className="form-group half">
          <label>Sleep End Time</label>
          <input
            type="time"
            value={sleepEnd}
            onChange={e => setSleepEnd(e.target.value)}
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Hours Slept (calculated)</label>
        <input
          type="text"
          value={hoursSlept ? `${hoursSlept} hours` : ''}
          readOnly
          className="readonly-input"
        />
      </div>
      
      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <button type="submit" className="add-btn">Add</button>
        <button type="button" onClick={onCancel}>Cancel</button>      </div>
    </form>
  );
};

export default SleepForm;
