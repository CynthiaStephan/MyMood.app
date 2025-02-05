// Importing required modules
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");
const verifyToken = require('./middlewares/verifyToken');


const authRoutes = require('./routes/authRoutes');
const blacklistRoutes = require('./routes/blacklistRoutes');
const cohortRoutes = require('./routes/cohortRoutes');
const moodScoreRoutes = require('./routes/moodScoreRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const corsOptions = {
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",   // Permet l'en-tête Content-Type
  credentials: true
};

// API documentation with Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Middleware to parse JSON requests
app.use(express.json());
// Middleware to parse cookies (sets req.cookies)
app.use(cookieParser());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
// Adding security headers with Helmet
app.use(helmet());
// Enabling CORS for cross-origin requests
app.use(cors(corsOptions));
// Initializing Passport for authentication
app.use(passport.initialize());


app.get('/', (req, res) => {
    res.json({ message: 'Test réussi !' });
});

app.get('/swagger.json', (req, res) => {
    res.json(swaggerSpec);
  });

// Registering route modules for handling specific API paths
app.use('/auth', authRoutes);
app.use('/blacklist', blacklistRoutes);
app.use('/cohort', cohortRoutes);
app.use('/mood', moodScoreRoutes);
app.use('/user', userRoutes);

// Exporting the configured Express app for use in other files
module.exports = app;
