const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  adminEmail: { type: String, required: true },
  date: { type: Date, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  attendees: [
    {
      name: String,
      email: String,
    },
  ],
  type: { type: String, enum: ['one-on-one', 'group'], default: 'one-on-one' },
});

module.exports = mongoose.model('Session', sessionSchema);
