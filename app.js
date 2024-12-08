const express = require('express');
const mongoose = require('mongoose');
const mainRoutes = require('./routes/taskRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3800;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to the database.');
  })
  .catch((error) => {
    console.error('Could not connect to the database:', error.message);
    process.exit(1); // Exit process on DB connection failure
  });

// Routes
app.use(mainRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 (Internal Server Error)
  const message = err.message || 'Internal Server Error';
  const details = err.details || null;

  console.error(`Error: ${message}`);
  res.status(statusCode).json({
    success: false,
    message,
    details,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
