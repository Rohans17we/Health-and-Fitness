import React, { useState, useEffect } from 'react';
import WaterForm from './WaterForm';
import WaterTable from './WaterTable';
import WaterTableFilters from './WaterTableFilters';
import './DashboardWater.css';

const defaultFilters = {
  dateFrom: '',
  dateTo: '',
  amountMin: '',
  amountMax: '',
  note: '',
};

const DashboardWater = () => {
  const [logs, setLogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const token = localStorage.getItem('token');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5057/api/WaterIntake/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
        setError('');
      } else {
        setError('Failed to load water intake logs.');
      }
    } catch (err) {
      setError('An error occurred while fetching water intake logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, [token]);

  const handleAdd = async (entry) => {
    try {
      const response = await fetch('http://localhost:5057/api/WaterIntake', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
      });
      if (response.ok) {
        setShowForm(false);
        fetchLogs();
      } else {
        setError('Failed to add water intake.');
      }
    } catch {
      setError('An error occurred while adding water intake.');
    }
  };

  const getFilteredLogs = () => {
    let filtered = [...logs];
    if (filters.dateFrom) filtered = filtered.filter(l => l.intakeTime.slice(0,10) >= filters.dateFrom);
    if (filters.dateTo) filtered = filtered.filter(l => l.intakeTime.slice(0,10) <= filters.dateTo);
    if (filters.amountMin) filtered = filtered.filter(l => Number(l.amount) >= Number(filters.amountMin));
    if (filters.amountMax) filtered = filtered.filter(l => Number(l.amount) <= Number(filters.amountMax));
    if (filters.note) filtered = filtered.filter(l => (l.note || '').toLowerCase().includes(filters.note.toLowerCase()));
    return filtered;
  };

  return (
    <div className="dashboard-water">
      <div className="dashboard-header">
        <h1>Water Intake Tracker</h1>
        <button className="add-water-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Water'}
        </button>
      </div>
      {showForm && <WaterForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />}
      {error && <div className="error-message">{error}</div>}
      <WaterTableFilters filters={filters} onChange={setFilters} />
      {loading ? <div className="loading">Loading...</div> : <WaterTable logs={getFilteredLogs()} />}
    </div>
  );
};

export default DashboardWater;
