const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', availabilityRoutes);
app.use('/api', sessionRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/scheduler', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

module.exports = app;
