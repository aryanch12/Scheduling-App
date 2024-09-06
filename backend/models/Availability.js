const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  slots: [
    {
      date: { type: Date, required: true },
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Availability', availabilitySchema);
