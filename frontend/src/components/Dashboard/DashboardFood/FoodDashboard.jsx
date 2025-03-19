import React, { useState, useEffect } from 'react';
import FoodForm from './FoodForm/FoodForm';
import FoodTable from './FoodTable/FoodTable';
import './FoodDashboard.css';

const FoodDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const token = localStorage.getItem('token');

  // Function to fetch food logs
  const fetchFoodLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5057/api/Nutrition/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFoods(data);
        setError('');
      } else {
        setError('Failed to load food logs');
      }
    } catch (err) {
      console.error('Error fetching food logs:', err);
      setError('An error occurred while fetching food logs');
    } finally {
      setLoading(false);
    }
  };

  // Fetch food logs on component mount
  useEffect(() => {
    fetchFoodLogs();
  }, []);

  // Handle successful form submission
  const handleFormSuccess = () => {
    setShowForm(false);
    // Add a slight delay before refreshing to ensure state updates complete
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 500);
  };

  return (
    <div className="food-dashboard">
      <div className="food-dashboard-header">
        <h1>Food Tracker</h1>
        <button 
          className="add-food-btn" 
          onClick={() => setShowForm(true)}
          disabled={showForm}
        >
          Add Food Log
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      
      {showForm ? (
        <FoodForm 
          onSuccess={handleFormSuccess} 
          onCancel={() => setShowForm(false)} 
        />
      ) : (
        loading ? (
          <div className="loading">Loading food logs...</div>
        ) : (
          <FoodTable foods={foods} />
        )
      )}
    </div>
  );
};

export default FoodDashboard;