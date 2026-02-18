import React from "react";
import { mealPlans } from "../data/meals";

function MealPlan({ goal }) {
  return (
    <div>
      <h3>Veg Meal Suggestions</h3>
      <ul>
        {mealPlans[goal].map((meal, index) => (
          <li key={index}>{meal}</li>
        ))}
      </ul>
    </div>
  );
}

export default MealPlan;
