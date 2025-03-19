import React, { useState, useEffect } from 'react';
import './FoodForm.css';

const FoodForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    foodName: '',
    caloriesConsumed: '',
    consumptionDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    consumptionTime: new Date().toTimeString().split(' ')[0].slice(0, 5), // HH:mm
  });

  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token'); // ✅ Get JWT Token

  // ✅ Fetch User ID from `/api/User/profile`
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5057/api/User/profile', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserId(userData.id); // ✅ Store user ID correctly
        } else {
          console.error('Failed to fetch user profile:', response.statusText);
        }
      } catch (err) {
        console.error('❌ Error fetching user profile:', err);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("❌ User not found. Please log in again.");
      return;
    }

    const foodData = {
      foodName: formData.foodName.trim(),
      caloriesConsumed: parseInt(formData.caloriesConsumed, 10),
      consumptionDate: formData.consumptionDate,
      consumptionTime: `${formData.consumptionTime}:00`, // Ensure HH:mm:ss format
      userId: parseInt(userId, 10),
    };

    try {
      const response = await fetch('http://localhost:5057/api/Nutrition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(foodData),
      });

      if (response.ok) {
        console.log('✅ Food log added successfully!');
        window.alert('✅ Food log added successfully!'); // ✅ Show success alert
        setError('');
        if (onSubmit) onSubmit(); // ✅ Call `onSubmit()` only if it's provided
        setFormData({
          foodName: '',
          caloriesConsumed: '',
          consumptionDate: new Date().toISOString().split('T')[0],
          consumptionTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
        });
      } else {
        const errorData = await response.json();
        setError(`❌ Failed to add food log: ${errorData.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error('❌ Error adding food log:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="food-form-container">
      <h2>Add Food Log</h2>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="food-form">
        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="foodName">Food Name</label>
              <input
                type="text"
                id="foodName"
                name="foodName"
                className="form-control"
                value={formData.foodName}
                onChange={handleChange}
                placeholder="e.g., Apple, Chicken Salad"
                required
              />
            </div>
          </div>

          <div className="form-col">
            <div className="form-group">
              <label htmlFor="caloriesConsumed">Calories</label>
              <input
                type="number"
                id="caloriesConsumed"
                name="caloriesConsumed"
                className="form-control"
                value={formData.caloriesConsumed}
                onChange={handleChange}
                placeholder="e.g., 250"
                min="1"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="consumptionDate">Date</label>
              <input
                type="date"
                id="consumptionDate"
                name="consumptionDate"
                className="form-control"
                value={formData.consumptionDate}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className="form-col">
            <div className="form-group">
              <label htmlFor="consumptionTime">Time</label>
              <input
                type="time"
                id="consumptionTime"
                name="consumptionTime"
                className="form-control"
                value={formData.consumptionTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Save Food Log
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodForm;