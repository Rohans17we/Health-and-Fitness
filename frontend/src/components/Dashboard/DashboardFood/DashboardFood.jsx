import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodForm from './FoodForm/FoodForm';
import FoodTable from './FoodTable/FoodTable';
import './DashboardFood.css';

const DashboardFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
      setFoods((prevFoods) => [newFood, ...prevFoods]);
      setShowForm(false);
      fetchFoods(); // ✅ Refresh food logs
      return true;
    } catch (err) {
      console.error('Error adding food log:', err);
      return false;
    }
  };

  return (
    <div className="dashboard-food">
      <div className="dashboard-header">
        <h1>Food Tracker</h1>
        <button className="add-food-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Food'}
        </button>
      </div>

      {showForm && <FoodForm onSubmit={handleAddFood} onCancel={() => setShowForm(false)} />}

      {loading ? (
        <div className="loading">Loading food logs...</div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button className="retry-button" onClick={fetchFoods}>Retry</button>
        </div>
      ) : (
        <FoodTable foods={foods} />
      )}
    </div>
  );
};

export default DashboardFood;