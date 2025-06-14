import React, { useState, useEffect } from 'react';
import SleepForm from './SleepForm';
import SleepTable from './SleepTable';
import SleepTableFilters from './SleepTableFilters';
import './DashboardSleep.css';

const defaultFilters = {
  dateFrom: '',
  dateTo: '',
  hoursMin: '',
  hoursMax: '',
};

const DashboardSleep = () => {
  const [logs, setLogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const token = localStorage.getItem('token');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5057/api/SleepTracking/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
        setError('');
      } else {
        setError('Failed to load sleep tracking logs.');
      }
    } catch (err) {
      setError('An error occurred while fetching sleep tracking logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, [token]);

  const handleAdd = async (entry) => {
    try {
      const response = await fetch('http://localhost:5057/api/SleepTracking', {
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
        setError('Failed to add sleep record.');
      }
    } catch {
      setError('An error occurred while adding sleep record.');
    }
  };

  const getFilteredLogs = () => {
    let filtered = [...logs];    if (filters.dateFrom) filtered = filtered.filter(l => l.date.slice(0,10) >= filters.dateFrom);
    if (filters.dateTo) filtered = filtered.filter(l => l.date.slice(0,10) <= filters.dateTo);
    if (filters.hoursMin) filtered = filtered.filter(l => l.hoursSlept >= Number(filters.hoursMin));
    if (filters.hoursMax) filtered = filtered.filter(l => l.hoursSlept <= Number(filters.hoursMax));
    return filtered;
  };

  return (
    <div className="dashboard-sleep">
      <div className="dashboard-header">
        <h1>Sleep Tracker</h1>
        <button className="add-sleep-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Sleep Record'}
        </button>
      </div>
      {showForm && <SleepForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />}
      {error && <div className="error-message">{error}</div>}
      <SleepTableFilters filters={filters} onChange={setFilters} />
      {loading ? <div className="loading">Loading...</div> : <SleepTable logs={getFilteredLogs()} />}
    </div>
  );
};

export default DashboardSleep;
