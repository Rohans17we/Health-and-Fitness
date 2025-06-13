import React, { useState, useEffect } from 'react';
import './FoodForm.css';

const defaultDetails = {
  servingSize: '',
  quantity: 1,
  unit: 'g',
  protein: '',
  carbs: '',
  fat: '',
  fiber: '',
  sugar: '',
  brand: '',
};

const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Other'];
const units = ['g', 'oz', 'ml', 'cup', 'tbsp', 'tsp', 'piece'];

const FoodForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    foodName: '',
    caloriesConsumed: '',
    consumptionDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    consumptionTime: new Date().toTimeString().split(' ')[0].slice(0, 5), // HH:mm
    mealType: 'Other',
  });
  const [details, setDetails] = useState(defaultDetails);
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

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("❌ User not found. Please log in again.");
      return;
    }

    // Build details object
    const detailsObj = {
      ...details,
      calories: parseInt(formData.caloriesConsumed, 10) || 0,
      foodName: formData.foodName.trim(),
    };

    // Parse numbers
    ['protein','carbs','fat','fiber','sugar','quantity'].forEach(f => {
      if (detailsObj[f] !== '') detailsObj[f] = parseFloat(detailsObj[f]) || 0;
    });

    const foodData = {
      foodName: formData.foodName.trim(),
      caloriesConsumed: parseInt(formData.caloriesConsumed, 10) || 0,
      consumptionDate: formData.consumptionDate,
      consumptionTime: `${formData.consumptionTime}:00`, // Ensure HH:mm:ss format
      detailsJson: JSON.stringify(detailsObj),
      mealType: formData.mealType,
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
        setError('');
        if (onSuccess) onSuccess();
        setFormData({
          foodName: '',
          caloriesConsumed: '',
          consumptionDate: new Date().toISOString().split('T')[0],
          consumptionTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
          mealType: 'Other',
        });
        setDetails(defaultDetails);
        window.location.reload(); // Force a full page refresh after successful submit
      } else {
        const errorData = await response.json();
        setError(`❌ Failed to add food log: ${errorData.message || "Unknown error"}`);
      }
    } catch (err) {
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

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="mealType">Meal Type</label>
              <select
                id="mealType"
                name="mealType"
                className="form-control"
                value={formData.mealType}
                onChange={handleChange}
                required
              >
                {mealTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-col">
            <div className="form-group">
              <label htmlFor="brand">Brand (optional)</label>
              <input
                type="text"
                id="brand"
                name="brand"
                className="form-control"
                value={details.brand}
                onChange={handleDetailsChange}
                placeholder="e.g., Dole, Subway"
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="servingSize">Serving Size</label>
              <input
                type="number"
                id="servingSize"
                name="servingSize"
                className="form-control"
                value={details.servingSize}
                onChange={handleDetailsChange}
                min="1"
                placeholder="e.g., 100"
                required
              />
            </div>
          </div>

          <div className="form-col">
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="form-control"
                value={details.quantity}
                onChange={handleDetailsChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-col">
            <div className="form-group">
              <label htmlFor="unit">Unit</label>
              <select
                id="unit"
                name="unit"
                className="form-control"
                value={details.unit}
                onChange={handleDetailsChange}
                required
              >
                {units.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="protein">Protein (g)</label>
              <input
                type="number"
                id="protein"
                name="protein"
                className="form-control"
                value={details.protein}
                onChange={handleDetailsChange}
                min="0"
                placeholder="e.g., 5"
              />
            </div>
          </div>

          <div className="form-col">
            <div className="form-group">
              <label htmlFor="carbs">Carbs (g)</label>
              <input
                type="number"
                id="carbs"
                name="carbs"
                className="form-control"
                value={details.carbs}
                onChange={handleDetailsChange}
                min="0"
                placeholder="e.g., 20"
              />
            </div>
          </div>

          <div className="form-col">
            <div className="form-group">
              <label htmlFor="fat">Fat (g)</label>
              <input
                type="number"
                id="fat"
                name="fat"
                className="form-control"
                value={details.fat}
                onChange={handleDetailsChange}
                min="0"
                placeholder="e.g., 2"
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="fiber">Fiber (g)</label>
              <input
                type="number"
                id="fiber"
                name="fiber"
                className="form-control"
                value={details.fiber}
                onChange={handleDetailsChange}
                min="0"
                placeholder="e.g., 3"
              />
            </div>
          </div>

          <div className="form-col">
            <div className="form-group">
              <label htmlFor="sugar">Sugar (g)</label>
              <input
                type="number"
                id="sugar"
                name="sugar"
                className="form-control"
                value={details.sugar}
                onChange={handleDetailsChange}
                min="0"
                placeholder="e.g., 10"
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