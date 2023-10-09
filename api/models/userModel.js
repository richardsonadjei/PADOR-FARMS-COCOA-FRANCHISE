const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Please enter your full name'],
  },
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    validate: {
      validator: function (value) {
        // Simple email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Please enter a valid Email',
    },
  },
  password: {
    type: String,
    validate: {
      validator: function (value) {
        return value.length >= 6;
      },
      message: 'Password must be more than six(6) characters',
    },
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    maxlength: [300, 'Bio cannot exceed 300 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the user model
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
