import React from "react";
import { workoutPlans } from "../data/workouts";

function WorkoutPlan({ goal }) {
  return (
    <div>
      <h3>Workout Plan</h3>
      <ul>
        {workoutPlans[goal].map((workout, index) => (
          <li key={index}>{workout}</li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutPlan;
