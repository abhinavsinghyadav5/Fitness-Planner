import React, { useState } from "react";

function UserForm({ onCalculate }) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState(""); // match backend values

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          height: Number(height),
          weight: Number(weight),
          goal,
        }),
      });

      const data = await response.json();
      onCalculate(data);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Enter weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Enter height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        required
      />

      <select value={goal} onChange={(e) => setGoal(e.target.value)} required>
       <option value="" disabled>
        Select Your Goal
        </option>
        <option value="muscle">Muscle Gain</option>
       <option value="fat">Fat Loss</option>
      </select>


      <button type="submit">Calculate</button>
    </form>
  );
}

export default UserForm;
