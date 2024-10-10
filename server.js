const express = require('express');
const mongoose = require('mongoose');
const fetchData = require('./jobs/fetchData');

const app = express();

mongoose.connect('mongodb://localhost:27017/cryptoTracker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('DB connection error:', err));

fetchData();

const statsRoute = require('./routes/stats');
const deviationRoute = require('./routes/deviation');

app.use('/api', statsRoute);
app.use('/api', deviationRoute);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
