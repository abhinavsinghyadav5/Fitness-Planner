import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import MealPlan from "./components/MealPlan";
import WorkoutPlan from "./components/WorkoutPlan";
import { motion } from "framer-motion";

function App() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  
  useEffect(() => {
    fetch("http://localhost:5000/calculations")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error(err));
  }, [result]);

  
  const getCategoryStyles = (category) => {
    const styles = {
      Underweight: {
        backgroundColor: "#cce5ff",
        color: "#004085",
      },
      Normal: {
        backgroundColor: "#d4edda",
        color: "#155724",
      },
      Overweight: {
        backgroundColor: "#fff3cd",
        color: "#856404",
      },
      Obese: {
        backgroundColor: "#f8d7da",
        color: "#721c24",
      },
    };

    return styles[category] || {};
  };

  return (
  <div className="app-container">
    <h1>Fitness & Nutrition Planner</h1>

    <div className="card">
      <UserForm onCalculate={setResult} />
    </div>

    {result && (
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3>Daily Requirements</h3>
        <p><strong>Calories:</strong> {result.calories} kcal</p>
        <p><strong>Protein:</strong> {result.protein} g</p>
        <p><strong>BMI:</strong> {result.bmi}</p>

        <p
          style={{
            ...getCategoryStyles(result.category),
            padding: "8px 12px",
            borderRadius: "8px",
            display: "inline-block",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          Category: {result.category}
        </p>

        <MealPlan goal={result.goal} />
        <WorkoutPlan goal={result.goal} />
      </motion.div>
    )}

    {/*  HISTORY SECTION  */}
    {history.length > 0 && (
      <div className="card">
        <h3>Previous Calculations</h3>

        {history.slice(0, 2).map((item) => (
          <div key={item._id} style={{ marginBottom: "10px" }}>
            <strong>BMI:</strong> {item.bmi} |{" "}
            <strong>Calories:</strong> {item.calories} kcal |{" "}
            <strong>Goal:</strong> {item.goal}
          </div>
        ))}
      </div>
    )}

  </div>
);
}

export default App;
