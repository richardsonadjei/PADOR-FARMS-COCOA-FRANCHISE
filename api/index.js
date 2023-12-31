const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth.route');
const { errorHandler } = require('./middleware/errorHandler');
const cors = require('cors');

const app = express();
const port = 3000; 

// Middleware which allows the user to be able to send JSON data as input
app.use(express.json());

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173', // Change this to your frontend URL
}));

// Routes
app.use('/api', authRoutes);


// Error handling middleware
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

