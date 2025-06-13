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

  const getDetails = (food) => {
    let details = {};
    try {
      details = food.detailsJson ? JSON.parse(food.detailsJson) : {};
    } catch { details = {}; }
    return details;
  };

  const dash = (val) => (val === undefined || val === '' || val === null ? <span className="dash">–</span> : val);

  return (
    <div className="food-table-container">
      <h2>Food History</h2>
      <div className="table-responsive">
        <table className="food-table modern">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Meal</th>
              <th>Food</th>
              <th>Brand</th>
              <th>Serving</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Calories</th>
              <th>Protein (g)</th>
              <th>Carbs (g)</th>
              <th>Fat (g)</th>
              <th>Fiber (g)</th>
              <th>Sugar (g)</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, idx) => {
              const details = getDetails(food);
              return (
                <tr key={food.id} className={idx % 2 === 0 ? 'even' : 'odd'}>
                  <td>{formatDate(food.consumptionDate)}</td>
                  <td>{formatTime(food.consumptionTime)}</td>
                  <td>{dash(food.mealType || 'Other')}</td>
                  <td>{dash(food.foodName)}</td>
                  <td>{dash(details.brand)}</td>
                  <td className="right">{dash(details.servingSize)}</td>
                  <td className="right">{dash(details.quantity)}</td>
                  <td>{dash(details.unit)}</td>
                  <td className="right highlight-calories">{dash(details.calories || food.caloriesConsumed)}</td>
                  <td className="right">{dash(details.protein)}</td>
                  <td className="right">{dash(details.carbs)}</td>
                  <td className="right">{dash(details.fat)}</td>
                  <td className="right">{dash(details.fiber)}</td>
                  <td className="right">{dash(details.sugar)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodTable;