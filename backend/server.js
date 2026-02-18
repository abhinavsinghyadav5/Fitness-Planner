const Calculation = require("./models/Calculation");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());    

//  Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected "))
  .catch((err) => console.log("MongoDB Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// BMI + Calorie calculation route
app.post("/calculate", async (req, res) => {
  try {
    const { height, weight, goal } = req.body;

    const heightInMeters = height / 100;
    const bmi = Number((weight / (heightInMeters * heightInMeters)).toFixed(1));

    let calories = weight * 24;

    if (goal === "muscle") {
      calories += 300;
    } else if (goal === "fat") {
      calories -= 300;
    }

    calories = Math.round(calories);

    const protein = Number((weight * 1.2).toFixed(1));

    //  BMI Category Logic
    let category = "";

    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi < 25) {
      category = "Normal";
    } else if (bmi < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    const newCalculation = new Calculation({
      height,
      weight,
      goal,
      bmi,
      calories,
      protein,
      category,
    });

    await newCalculation.save();

    res.json({
      bmi,
      calories,
      protein,
      goal,
      category, 
    });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.get("/calculations", async (req, res) => {
  try {
    const data = await Calculation.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching history" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
