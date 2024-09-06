const express = require('express');
const Availability = require('../models/Availability');
const router = express.Router();

// Add or update availability
router.post('/availability', async (req, res) => {
  const { userEmail, slots } = req.body;
  try {
    let availability = await Availability.findOne({ userEmail });
    if (availability) {
      availability.slots = slots;
      await availability.save();
    } else {
      availability = new Availability({ userEmail, slots });
      await availability.save();
    }
    res.status(200).json({ message: 'Availability saved', availability });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get availability for all users
router.get('/availability', async (req, res) => {
  try {
    const availability = await Availability.find();
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
