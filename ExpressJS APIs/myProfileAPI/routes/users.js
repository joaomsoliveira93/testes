
const express = require('express');
const User = require('../models/user'); // Import the User model

const router = express.Router();

// Create a new user
router.post('/create', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      // Add more fields as needed
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

module.exports = router;