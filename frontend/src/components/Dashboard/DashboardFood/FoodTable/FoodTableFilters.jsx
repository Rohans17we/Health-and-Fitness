import React from 'react';
import './FoodTableFilters.css';

const mealTypes = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Other'];
const sortOptions = [
  { value: 'date-desc', label: 'Date (Newest First)' },
  { value: 'date-asc', label: 'Date (Oldest First)' },
  { value: 'calories-desc', label: 'Calories (High to Low)' },
  { value: 'calories-asc', label: 'Calories (Low to High)' },
];

const FoodTableFilters = ({ filters, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="food-table-filters-container">
      <div className="food-table-filters-label">Filter Food Logs</div>
      <div className="food-table-filters">
        <select name="mealType" value={filters.mealType} onChange={handleChange}>
          {mealTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleChange} />
        <input type="date" name="dateTo" value={filters.dateTo} onChange={handleChange} />
        <input type="time" name="timeFrom" value={filters.timeFrom} onChange={handleChange} />
        <input type="time" name="timeTo" value={filters.timeTo} onChange={handleChange} />
        <input type="number" name="calMin" value={filters.calMin} onChange={handleChange} placeholder="Min Cal" min="0" style={{width: 80}} />
        <input type="number" name="calMax" value={filters.calMax} onChange={handleChange} placeholder="Max Cal" min="0" style={{width: 80}} />
        <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FoodTableFilters;
