const express = require('express');
const passport = require('passport');

const app = express();

const PORT = process.env.PORT || 3650;

app.use(express.json());