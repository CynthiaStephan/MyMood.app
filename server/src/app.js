// Importing required modules
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
// Adding security headers with Helmet
app.use(helmet());
// Enabling CORS for cross-origin requests
app.use(cors());
// Initializing Passport for authentication
app.use(passport.initialize()); 

app.get('/', (req, res) => {
    res.json({ message: 'Test réussi !' });
  });

// Registering route modules for handling specific API paths

// Exporting the configured Express app for use in other files
module.exports = app;
