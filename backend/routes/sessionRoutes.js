const express = require('express');
const Session = require('../models/Session');
const router = express.Router();

// Schedule a session
router.post('/sessions', async (req, res) => {
  const { adminEmail, date, start, end, attendees, type } = req.body;
  try {
    // Check for conflicts (simplified logic)
    const conflict = await Session.findOne({
      date,
      start,
      attendees: { $elemMatch: { email: { $in: attendees.map(a => a.email) } } },
    });

    if (conflict) {
      return res.status(400).json({ error: 'Scheduling conflict detected' });
    }

    const session = new Session({ adminEmail, date, start, end, attendees, type });
    await session.save();

    // TODO: Send notifications to attendees

    res.status(200).json({ message: 'Session scheduled', session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sessions for a user or admin
router.get('/sessions', async (req, res) => {
  const { email } = req.query;
  try {
    const sessions = await Session.find({
      $or: [
        { adminEmail: email },
        { 'attendees.email': email },
      ],
    });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
