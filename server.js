const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ev_energy_consumption', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema and model for energy consumption data
const EVDataSchema = new mongoose.Schema({
  averageSpeed: Number,
  parkHeating: Boolean,
  ac: Boolean,
  drivingStyle: String,
  ecrDeviation: Number,
  tireType: String,
  drivingStyle: String,
  quantity: Number,
});

const EVData = mongoose.model('EVData', EVDataSchema);

// API endpoint to handle energy consumption calculation
app.post('/api/energy-consumption', async (req, res) => {
  const {
    averageSpeed,
    parkHeating,
    ac,
    drivingStyle,
    ecrDeviation,
    tireType,
    quantity,
    fromCity,
    toCity,
  } = req.body;

  // Calculate trip distance using Google Maps API
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  const distanceAPI = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${fromCity}&destinations=${toCity}&key=${apiKey}`;

  try {
    const response = await axios.get(distanceAPI);
    const tripDistance = response.data.rows[0].elements[0].distance.value / 1000;

    // Calculate energy consumption using your machine learning model
    const energyConsumption = yourMLModel(
      tripDistance,
      averageSpeed,
      parkHeating,
      ac,
      drivingStyle,
      ecrDeviation,
      tireType,
      drivingStyle,
      quantity
    );

    // Store data in the MongoDB database
    const evData = new EVData({
      averageSpeed,
      parkHeating,
      ac,
      drivingStyle,
      ecrDeviation,
      tireType,
      drivingStyle,
      quantity,
      tripDistance,
      energyConsumption,
    });

    await evData.save();

    res.json({ energyConsumption });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
