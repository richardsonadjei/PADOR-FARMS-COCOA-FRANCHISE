
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Controller function for user signup
exports.signup = async (req, res) => {
  try {
    const { fullname, username, email, password, phoneNumber, bio } = req.body;

    // Check if user already exists with the same email or username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
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
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};