const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const port = 3000; 

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
