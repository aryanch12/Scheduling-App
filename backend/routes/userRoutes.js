const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register or login user
router.post('/users', async (req, res) => {
  const { email, notificationPreference } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, notificationPreference });
      await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
