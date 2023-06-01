// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    averageSpeed: '',
    parkHeating: false,
    ac: false,
    drivingStyle: '',
    ecrDeviation: '',
    tireType: '',
    drivingStyle: '',
    quantity: '',
    fromCity: '',
    toCity: '',
  });
  const [energyConsumption, setEnergyConsumption] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/energy-consumption', formData);
      setEnergyConsumption(response.data.energyConsumption);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Electric Vehicle Energy Consumption Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Average Speed (km/h):</label>
          <input
            type="number"
            name="averageSpeed"
            value={formData.averageSpeed}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Park Heating:</label>
          <input
            type="checkbox"
            name="parkHeating"
            checked={formData.parkHeating}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>AC:</label>
          <input
            type="checkbox"
            name="ac"
            checked={formData.ac}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Driving Style:</label>
          <select name="drivingStyle" value={formData.drivingStyle} onChange={handleChange} required>
            <option value="">Select Driving Style</option>
            <option value="Aggressive">Aggressive</option>
            <option value="Normal">Normal</option>
            <option value="Eco-Friendly">Eco-Friendly</option>
          </select>
        </div>
        <div className="form-group">
          <label>ECR Deviation:</label>
          <input
            type="number"
            name="ecrDeviation"
            value={formData.ecrDeviation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tire Type:</label>
          <input
            type="text"
            name="tireType"
            value={formData.tireType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity (kWh):</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Travelling From:</label>
          <input
            type="text"
            name="fromCity"
            value={formData.fromCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Travelling To:</label>
          <input
            type="text"
            name="toCity"
            value={formData.toCity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Calculate Energy Consumption</button>
      </form>
      {energyConsumption && (
        <div className="result">
          <h2>Estimated Energy Consumption:</h2>
          <p>{energyConsumption} kWh</p>
        </div>
      )}
    </div>
  );
};

export default App;
