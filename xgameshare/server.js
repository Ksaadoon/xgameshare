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
app.use(logger('combined'));
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// Routes

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Client-ID');
  next();
});


const proxyOptionsForIgdb = {
  target: process.env.REACT_APP_IGDB_BASE_URL,
  headers: {
    'Client-ID': process.env.TWITCH_CLIENT_ID,
  },
  changeOrigin: true,
  secure: true,
  pathRewrite: {
    [`^${process.env.REACT_APP_IGDB_PROXY_BASE_PATH}`]: '',
  },
  onProxyRes: function (proxyRes, req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Client-ID');
  },
}
const proxyIgdb = createProxyMiddleware(proxyOptionsForIgdb);
app.use(`${process.env.REACT_APP_IGDB_PROXY_BASE_PATH}`, proxyIgdb);

app.use('/api/auth/twitch', require('./routes/twitchAuth'));
app.use('/api/users', require('./routes/users'));

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