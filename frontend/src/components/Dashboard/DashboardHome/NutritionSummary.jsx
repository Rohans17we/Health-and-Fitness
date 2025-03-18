import React from 'react';

const NutritionSummary = () => {
  const nutritionData = {
    calories: { consumed: 1850, goal: 2200 },
    protein: { consumed: 95, goal: 120 },
    carbs: { consumed: 210, goal: 250 },
    fat: { consumed: 55, goal: 70 }
  };
  
  const calculatePercentage = (consumed, goal) => {
    return Math.min(Math.round((consumed / goal) * 100), 100);
  };
  
  return (
    <div className="nutrition-container">
      <h3>Nutrition Summary</h3>
      
      <div className="nutrition-item">
        <div className="nutrition-header">
          <span className="nutrition-label">Calories</span>
          <span className="nutrition-values">
            {nutritionData.calories.consumed} / {nutritionData.calories.goal} kcal
          </span>
        </div>
        <div className="nutrition-progress">
          <div 
            className="nutrition-progress-fill calories" 
            style={{ width: `${calculatePercentage(nutritionData.calories.consumed, nutritionData.calories.goal)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="nutrition-item">
        <div className="nutrition-header">
          <span className="nutrition-label">Protein</span>
          <span className="nutrition-values">
            {nutritionData.protein.consumed} / {nutritionData.protein.goal} g
          </span>
        </div>
        <div className="nutrition-progress">
          <div 
            className="nutrition-progress-fill protein" 
            style={{ width: `${calculatePercentage(nutritionData.protein.consumed, nutritionData.protein.goal)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="nutrition-item">
        <div className="nutrition-header">
          <span className="nutrition-label">Carbs</span>
          <span className="nutrition-values">
            {nutritionData.carbs.consumed} / {nutritionData.carbs.goal} g
          </span>
        </div>
        <div className="nutrition-progress">
          <div 
            className="nutrition-progress-fill carbs" 
            style={{ width: `${calculatePercentage(nutritionData.carbs.consumed, nutritionData.carbs.goal)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="nutrition-item">
        <div className="nutrition-header">
          <span className="nutrition-label">Fat</span>
          <span className="nutrition-values">
            {nutritionData.fat.consumed} / {nutritionData.fat.goal} g
          </span>
        </div>
        <div className="nutrition-progress">
          <div 
            className="nutrition-progress-fill fat" 
            style={{ width: `${calculatePercentage(nutritionData.fat.consumed, nutritionData.fat.goal)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NutritionSummary;