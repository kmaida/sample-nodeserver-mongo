// Modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// Config
const config = require('./config');

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Mongoose
mongoose.connect(config.mongoURI);
const monDb = mongoose.connection;
monDb.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that', config.mongoURI, 'is running.');
});
monDb.once('open', function callback() {
  console.info('Connected to MongoDB:', config.mongoURI);
});

// Set port
const port = process.env.PORT || '3005';
app.set('port', port);

// Routes
require('./routes')(app, config);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));
