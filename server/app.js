// Importing modules
const express = require('express');
const passport = require('passport');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(passport.initialize()); 

app.get('/', (req, res) => {
    res.json({ message: 'Test réussi !' });
  });


// Exporting the configured Express app
module.exports = app;
