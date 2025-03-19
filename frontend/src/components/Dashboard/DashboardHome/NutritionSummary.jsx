import React from 'react';

const NutritionSummary = ({ userData }) => {
  // Check if nutrition data exists
  const hasNutritionData = userData?.nutrition !== undefined;
  
  // Default values or from userData if available
  const nutrition = userData?.nutrition || {};
  
  const calories = {
    current: nutrition.calories?.current || 0,
    goal: nutrition.calories?.goal || 2200
  };
  
  const protein = {
    current: nutrition.protein?.current || 0,
    goal: nutrition.protein?.goal || 120
  };
  
  const carbs = {
    current: nutrition.carbs?.current || 0,
    goal: nutrition.carbs?.goal || 250
  };
  
  const fat = {
    current: nutrition.fat?.current || 0,
    goal: nutrition.fat?.goal || 70
  };
  
  // Calculate percentages
  const getPercentage = (current, goal) => Math.min(Math.round((current / goal) * 100), 100);
  
  return (
    <div className="nutrition-container">
      <h3>Nutrition Summary</h3>
      
      {hasNutritionData ? (
        <>
          <div className="nutrition-item">
            <div className="nutrition-header">
              <span className="nutrition-label">Calories</span>
              <span className="nutrition-values">{calories.current} / {calories.goal} kcal</span>
            </div>
            <div className="nutrition-progress">
              <div 
                className="nutrition-progress-fill calories" 
                style={{ width: `${getPercentage(calories.current, calories.goal)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="nutrition-item">
            <div className="nutrition-header">
              <span className="nutrition-label">Protein</span>
              <span className="nutrition-values">{protein.current} / {protein.goal} g</span>
            </div>
            <div className="nutrition-progress">
              <div 
                className="nutrition-progress-fill protein" 
                style={{ width: `${getPercentage(protein.current, protein.goal)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="nutrition-item">
            <div className="nutrition-header">
              <span className="nutrition-label">Carbs</span>
              <span className="nutrition-values">{carbs.current} / {carbs.goal} g</span>
            </div>
            <div className="nutrition-progress">
              <div 
                className="nutrition-progress-fill carbs" 
                style={{ width: `${getPercentage(carbs.current, carbs.goal)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="nutrition-item">
            <div className="nutrition-header">
              <span className="nutrition-label">Fat</span>
              <span className="nutrition-values">{fat.current} / {fat.goal} g</span>
            </div>
            <div className="nutrition-progress">
              <div 
                className="nutrition-progress-fill fat" 
                style={{ width: `${getPercentage(fat.current, fat.goal)}%` }}
              ></div>
            </div>
          </div>
        </>
      ) : (
        <div className="data-not-available">
          <p>Nutrition data not available</p>
        </div>
      )}
    </div>
  );
};

export default NutritionSummary;