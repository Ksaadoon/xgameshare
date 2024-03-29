const path = require('path');
const favicon = require('serve-favicon');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const logger = require('morgan');

require('dotenv').config();

const app = express();

// connect to the database with AFTER the config vars are processed
require('./config/database');

// Middleware
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
// when a user logs in, the name "userToken" is used to store the JWT inside the local storage.
// This middleware is very important to that all request made are pre-processed by this 
// middleware to extract from the jwt the user object and put it in the req header
// at the req.user field.
//
app.use(require('./helpers/checkToken'));

// Routes

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Client-ID');
  next();
});

//PROXY for IGDB DATA
const proxyOptionsForIgdb = {
  target: process.env.REACT_APP_IGDB_BASE_URL_DATA,
  headers: {
    'Client-ID': process.env.TWITCH_CLIENT_ID,
  },
  changeOrigin: true,
  secure: true,
  pathRewrite: {
    [`^${process.env.REACT_APP_IGDB_PROXY_BASE_PATH_DATA}`]: '',
  },
  onProxyRes: function (proxyRes, req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Client-ID');
  },
}
const proxyIgdb_DATA = createProxyMiddleware(proxyOptionsForIgdb);

app.use(`${process.env.REACT_APP_IGDB_PROXY_BASE_PATH_DATA}`, proxyIgdb_DATA);


app.use('/api/auth/twitch', require('./routes/twitchAuth'));
app.use('/api/users', require('./routes/users'));
app.use('/favoritegames', require('./routes/games'));

// Catch-all route to serve index.html - must be defined at the end of all the routes.
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// ____________
// Listeners
// ____________

const host = process.env.REACT_APP_LOCALHOST;
const port = process.env.REACT_APP_SERVER_PORT;

//the order in listen(port, host) is important otherwise getting address already in use!
module.exports = app.listen(port, host, () => console.log('Running express server and CORS proxies at: '  + host + ":" + port));

app.listen (process.env.PORT || 6969);