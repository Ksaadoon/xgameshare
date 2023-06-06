const path = require('path');
const favicon = require('serve-favicon');
const express = require('express');
const corsAnywhere = require('cors-anywhere');
const logger = require('morgan');

require('dotenv').config();

const port = process.env.PORT || 3001;

const app = express();

// connect to the database with AFTER the config vars are processed
require('./config/database');

// Middleware
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// Configure the CORS Anywhere proxy
const corsProxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['Client-Id', 'Authorization'],
  removeHeaders: []
});

// Routes
app.use('/env', require('./routes/env'));
app.use('/api/auth/twitch', require('./routes/twitchAuth'));
app.use('/api/users', require('./routes/users'));

// Add a route for the CORS proxy server
// The app.all() method is used in the updated code example to handle all HTTP methods (GET, POST, PUT, DELETE, etc.) for the proxy route. 
// app.use() only matches middleware for specific HTTP methods (e.g., app.use('/proxy', ...) would match GET, POST, PUT, and DELETE
// const proxyPath = '/proxy'; // Example path for the proxy server
// app.use(proxyPath, (req, res) => {
//   req.method = req.method.toUpperCase(); // Set the method to match the original request
//   req.url = req.url.replace(proxyPath, ''); // Remove the proxy path from the URL
//   corsProxy.emit('request', req, res);
// });

// Add a route for the CORS proxy server
app.all('/proxy/:proxyUrl*', (req, res) => {
  req.method = req.method.toUpperCase(); // Set the method to match the original request
  //req.url = req.url.replace(/^\/proxy\//, ''); // Remove the '/proxy/' prefix from the URL
  req.url = req.url.replace('/proxy/', '/');
  corsProxy.emit('request', req, res);
});

// Catch-all route to serve index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start both servers on the same port
app.listen(port, () => {
  console.log(`Express server and CORS Anywhere proxy server are running on port ${port}`);
});
