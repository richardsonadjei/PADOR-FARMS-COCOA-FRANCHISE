
const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');

// POST route for user signup
router.post('/signup', userController.signup);

module.exports = router;