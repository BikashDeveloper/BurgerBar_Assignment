const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const Counter = require('./models/Counter');
const orderRoutes = require('./routes/orderRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Counter
const initializeCounter = async () => {
  const counterExists = await Counter.findOne({ name: 'order' });
  if (!counterExists) {
    await Counter.create({ name: 'order', seq: 0 });
    console.log('Counter initialized');
  }
};
initializeCounter();


const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';  // Replace with your actual frontend URL
const corsOptions = {
  origin: frontendUrl,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', orderRoutes);

app.listen(PORT, () => console.log(`Server running on  PORT${PORT}`));
