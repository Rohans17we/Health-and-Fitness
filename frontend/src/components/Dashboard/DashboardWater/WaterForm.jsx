import React, { useState } from 'react';

const quickAmounts = [250, 500, 750]; // ml

const WaterForm = ({ onSubmit, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [intakeTime, setIntakeTime] = useState(new Date().toISOString().slice(0,16));
  const [note, setNote] = useState('');

  const handleQuickAdd = (val) => setAmount(val);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;
    onSubmit({
      amount: Number(amount),
      intakeTime: new Date(intakeTime).toISOString(),
      note: note.trim()
    });
    setAmount('');
    setNote('');
  };

  return (
    <form className="water-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Amount (ml)</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {quickAmounts.map(val => (
            <button type="button" key={val} onClick={() => handleQuickAdd(val)}>{val}ml</button>
          ))}
          <input
            type="number"
            min="1"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Custom"
            style={{ width: 80 }}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Time</label>
        <input
          type="datetime-local"
          value={intakeTime}
          onChange={e => setIntakeTime(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Note (optional)</label>
        <input
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="e.g. After workout"
        />
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <button type="submit" className="add-btn">Add</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default WaterForm;
