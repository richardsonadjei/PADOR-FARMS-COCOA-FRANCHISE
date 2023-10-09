const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../middleware/errorHandler');

// Controller function for user signup
exports.signup = async (req, res, next) => {
  try {
    const { fullname, username, email, password, phoneNumber, bio } = req.body;
    // Check if user already exists with the same email or username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 400;
      throw error;
    }
    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      bio,
    });
    // Save the user to the database
    await newUser.save();
    // Return success response
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

// Controller function for user signin
exports.signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      const error = new Error('Invalid username or password');
      error.statusCode = 401;
      throw error;
    }
    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid username or password');
      error.statusCode = 401;
      throw error;
    }
    // Generate a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });
    // Set the token as a httpOnly cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 8 * 60 * 60 * 1000 });
    // Return success response
    return res.status(200).json({ user: { 
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      bio: user.bio
    }});
  } catch (error) {
    next(error);
  }
};

// Error handling middleware
exports.handleErrors = errorHandler;

// Error handler middleware
exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const success = false;
  const message = err.message || 'Server error';
  console.error(err);
  // Send the error response to the client
  res.status(statusCode).json({ success, statusCode, message });
};