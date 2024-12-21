import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Import Navbar component
import Footer from '../components/Footer'; // Import Navbar component

import './VirtualDietician.css'; // Import CSS file for styling

export default function VirtualDietician() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [healthGoal, setHealthGoal] = useState('');
  const [requiredNutrients, setRequiredNutrients] = useState(null);

  // Function to calculate required nutrients
  const calculateNutrients = () => {
    // Convert height to cm
    const heightCm = height;

    // Calculate BMR (Basal Metabolic Rate)
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * heightCm - 5 * age + 5; // kcal/day
    } else if (gender === 'female') {
      bmr = 10 * weight + 6.25 * heightCm - 5 * age - 161; // kcal/day
    }

    // Adjust calories based on health goal
    let adjustedBmr = bmr;
    if (healthGoal === 'weightGain') {
      adjustedBmr *= 1.15; // Increase by 15%
    } else if (healthGoal === 'weightLoss') {
      adjustedBmr *= 0.85; // Decrease by 15%
    }

    // Calculate protein requirements
    const protein = weight * 1.5; // g/day
    const proteinCalories = protein * 4; // kcal/day

    // Calculate fat requirements
    const fat = weight * 0.75; // g/day
    const fatCalories = fat * 9; // kcal/day

    // Calculate remaining calories after accounting for protein and fat
    const remainingCalories = adjustedBmr - (proteinCalories + fatCalories);

    // Calculate carbohydrate requirements
    const carbohydrates = remainingCalories / 4; // g/day

    // Return the calculated nutrients
    return { calories: adjustedBmr, carbohydrates, proteins: protein, fats: fat };
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate required nutrients
    const nutrients = calculateNutrients();
    // Set the calculated nutrients
    setRequiredNutrients(nutrients);
  };

  return (
    <div>
      <Navbar /> {/* Render the Navbar component */}
      <div className="virtual-dietician-container">
        <h1>Virtual Dietician</h1>
        <form onSubmit={handleSubmit} className="diet-form">
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="form-control"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height (cm):</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight (kg):</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="healthGoal">Health Goal:</label>
            <select
              id="healthGoal"
              value={healthGoal}
              onChange={(e) => setHealthGoal(e.target.value)}
              className="form-control"
            >
              <option value="">Select Health Goal</option>
              <option value="weightLoss">Weight Loss</option>
              <option value="maintenance">Maintenance</option>
              <option value="weightGain">Weight Gain</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Calculate</button>
        </form>
        {requiredNutrients && (
          <div className="nutrients-result">
            <h2>Required Nutrients:</h2>
            <p><strong>Calories:</strong> {requiredNutrients.calories.toFixed(2)} kcal/day</p>
            <p><strong>Carbohydrates:</strong> {requiredNutrients.carbohydrates.toFixed(2)} g/day</p>
            <p><strong>Proteins:</strong> {requiredNutrients.proteins.toFixed(2)} g/day</p>
            <p><strong>Fats:</strong> {requiredNutrients.fats.toFixed(2)} g/day</p>
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
