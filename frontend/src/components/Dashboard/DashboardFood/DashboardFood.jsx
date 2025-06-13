import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodForm from './FoodForm/FoodForm';
import FoodTable from './FoodTable/FoodTable';
import FoodTableFilters from './FoodTable/FoodTableFilters';
import './DashboardFood.css';

const defaultFilters = {
  mealType: 'All',
  dateFrom: '',
  dateTo: '',
  timeFrom: '',
  timeTo: '',
  calMin: '',
  calMax: '',
  sortBy: 'date-desc',
};

const DashboardFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);

  // ✅ Fetch food logs when component mounts
  useEffect(() => {
    fetchFoods();
  }, []);

  // ✅ Fetch food logs from API
  const fetchFoods = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5057/api/Nutrition', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoods(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching food logs:', err);
      setError('Failed to load food logs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add New Food Log
  const handleAddFood = async (foodData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5057/api/Nutrition', foodData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      setFoods([response.data, ...foods]);
      setShowForm(false);
      fetchFoods(); // ✅ Refresh food logs
      return true;
    } catch (err) {
      console.error('Error adding food log:', err);
      return false;
    }
  };

  // Filtering and sorting logic
  const getFilteredFoods = () => {
    let filtered = [...foods];
    if (filters.mealType !== 'All') filtered = filtered.filter(f => (f.mealType || 'Other') === filters.mealType);
    if (filters.dateFrom) filtered = filtered.filter(f => f.consumptionDate >= filters.dateFrom);
    if (filters.dateTo) filtered = filtered.filter(f => f.consumptionDate <= filters.dateTo);
    if (filters.timeFrom) filtered = filtered.filter(f => (f.consumptionTime || '').slice(0,5) >= filters.timeFrom);
    if (filters.timeTo) filtered = filtered.filter(f => (f.consumptionTime || '').slice(0,5) <= filters.timeTo);
    if (filters.calMin) filtered = filtered.filter(f => (f.caloriesConsumed || 0) >= Number(filters.calMin));
    if (filters.calMax) filtered = filtered.filter(f => (f.caloriesConsumed || 0) <= Number(filters.calMax));
    // Sorting
    if (filters.sortBy === 'date-desc') filtered.sort((a, b) => b.consumptionDate.localeCompare(a.consumptionDate) || b.consumptionTime.localeCompare(a.consumptionTime));
    if (filters.sortBy === 'date-asc') filtered.sort((a, b) => a.consumptionDate.localeCompare(b.consumptionDate) || a.consumptionTime.localeCompare(b.consumptionTime));
    if (filters.sortBy === 'calories-desc') filtered.sort((a, b) => (b.caloriesConsumed || 0) - (a.caloriesConsumed || 0));
    if (filters.sortBy === 'calories-asc') filtered.sort((a, b) => (a.caloriesConsumed || 0) - (b.caloriesConsumed || 0));
    return filtered;
  };

  return (
    <div className="dashboard-food">
      <div className="dashboard-header">
        <h1>Food Tracker</h1>
        <button className="add-food-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Food'}
        </button>
      </div>
      <FoodTableFilters filters={filters} onChange={setFilters} />
      {showForm && <FoodForm onSubmit={handleAddFood} onCancel={() => setShowForm(false)} />}
      {loading ? (
        <div className="loading">Loading food logs...</div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button className="retry-button" onClick={fetchFoods}>Retry</button>
        </div>
      ) : (
        <FoodTable foods={getFilteredFoods()} />
      )}
    </div>
  );
};

export default DashboardFood;