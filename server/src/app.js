// Importing required modules
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const blacklistRoutes = require('./routes/blacklistRoutes');
const cohortRoutes = require('./routes/cohortRoutes');
const moodScoreRoutes = require('./routes/moodScoreRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();

// Middleware to parse JSON requests
app.use(express.json());
// Middleware to parse cookies (sets req.cookies)
app.use(cookieParser());
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
app.use('/auth', authRoutes);
app.use('/blacklist', blacklistRoutes);
app.use('/cohort', cohortRoutes);
app.use('/mood', moodScoreRoutes);
app.use('/user', userRoutes);

// Exporting the configured Express app for use in other files
module.exports = app;
