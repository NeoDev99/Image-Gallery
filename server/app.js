// To configure the Express app, middlewares, and routes.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Import routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Use Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/uploads', uploadRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

module.exports = app;
