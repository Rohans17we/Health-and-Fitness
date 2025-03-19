import React from 'react';
import './FoodTable.css';

const FoodTable = ({ foods }) => {
  if (!Array.isArray(foods) || foods.length === 0) {
    return <div className="no-foods"><p>No food logs found. Add some to get started!</p></div>;
  }

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A';
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch {
      return 'Invalid Time';
    }
  };

  return (
    <div className="food-table-container">
      <h2>Food History</h2>
      <table className="food-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Food</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {foods.map(food => (
            <tr key={food.id}>
              <td>{formatDate(food.consumptionDate)}</td>
              <td>{formatTime(food.consumptionTime)}</td>
              <td>{food.foodName}</td>
              <td>{food.caloriesConsumed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodTable;