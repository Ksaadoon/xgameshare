// ___________________
// Dependencies
// ___________________
const path = require('path');
const favicon = require('serve-favicon');
const express = require('express')
const logger = require('morgan');

// It's very important to require dotenv before any other module
// that depends upon the properties added to process.env 
require('dotenv').config();

// Make sure the express server is using port 3001 (instead 3000 (the default))
// because the React server is already using port 
const port = process.env.PORT || 3001

const app = express()

// connect to the database with AFTER the config vars are processed
require('./config/database');

// ___________________
// Middleware
// ___________________
// use morgan
app.use(logger('dev'))
// use public folder for st
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico'))); 
// lets us use static files
app.use(express.static(path.join(__dirname, 'build')));
// returns middleware that only parses JSON
app.use(express.json())


//-----------------
// ROUTES
// ---------------
// Put all API routes here (before the catch-all)
//some routes here
app.use('/api/users', require('./routes/users'));

// Catch all - must be at the end of routes
// A single "catch all" route is required to serve the index.html when any non-AJAX "API"
// request is received by the Express app:
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// ___________________
// Listener
// ___________________
module.exports = app.listen(port, () => console.log('Running express server on port:' + port))

