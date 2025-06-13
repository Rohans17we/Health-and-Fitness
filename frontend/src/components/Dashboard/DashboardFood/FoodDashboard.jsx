import React, { useState, useEffect } from 'react';
import FoodForm from './FoodForm/FoodForm';
import FoodTable from './FoodTable/FoodTable';
import './FoodDashboard.css';

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

const FoodDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const token = localStorage.getItem('token');

  // Function to fetch food logs
  const fetchFoodLogs = async () => {
    setLoading(true);
    try {
      const freshToken = localStorage.getItem('token');
      const response = await fetch('http://localhost:5057/api/Nutrition/user', {
        headers: {
          'Authorization': `Bearer ${freshToken}`
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

  // Fetch food logs on component mount and when token changes
  useEffect(() => {
    fetchFoodLogs();
  }, [token]);

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

  // Handle successful form submission
  const handleFormSuccess = () => {
    setShowForm(false);
    setTimeout(() => {
      fetchFoodLogs();
    }, 300); // Add a short delay to ensure backend is updated
  };

  return (
    <div className="food-dashboard">
      <div style={{background:'#f00',height:60,color:'#fff',fontWeight:'bold',fontSize:24,display:'flex',alignItems:'center',justifyContent:'center'}}>DEBUG FILTER BAR</div>
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
      {/* Inline filter bar for debug */}
      <div style={{background:'#f8fafc',border:'2px solid #e0e7ff',borderRadius:8,padding:'18px 20px',marginBottom:18,display:'flex',flexWrap:'wrap',gap:12,alignItems:'center',zIndex:2}}>
        <div style={{fontWeight:600,marginRight:8}}>Filter Food Logs</div>
        <select name="mealType" value={filters.mealType} onChange={e=>setFilters({...filters, mealType:e.target.value})}>
          {['All','Breakfast','Lunch','Dinner','Snack','Other'].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input type="date" name="dateFrom" value={filters.dateFrom} onChange={e=>setFilters({...filters, dateFrom:e.target.value})} />
        <input type="date" name="dateTo" value={filters.dateTo} onChange={e=>setFilters({...filters, dateTo:e.target.value})} />
        <input type="time" name="timeFrom" value={filters.timeFrom} onChange={e=>setFilters({...filters, timeFrom:e.target.value})} />
        <input type="time" name="timeTo" value={filters.timeTo} onChange={e=>setFilters({...filters, timeTo:e.target.value})} />
        <input type="number" name="calMin" value={filters.calMin} onChange={e=>setFilters({...filters, calMin:e.target.value})} placeholder="Min Cal" min="0" style={{width:80}} />
        <input type="number" name="calMax" value={filters.calMax} onChange={e=>setFilters({...filters, calMax:e.target.value})} placeholder="Max Cal" min="0" style={{width:80}} />
        <select name="sortBy" value={filters.sortBy} onChange={e=>setFilters({...filters, sortBy:e.target.value})}>
          <option value="date-desc">Date (Newest First)</option>
          <option value="date-asc">Date (Oldest First)</option>
          <option value="calories-desc">Calories (High to Low)</option>
          <option value="calories-asc">Calories (Low to High)</option>
        </select>
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
          <FoodTable foods={getFilteredFoods()} />
        )
      )}
    </div>
  );
};

export default FoodDashboard;