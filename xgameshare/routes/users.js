const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const ensureLoggedIn = require('../helpers/ensureLoggedin');

/**
 * When starting the server.js, the '/api/users' was mounted like this: 
 *      app.use('/api/users', require('./routes/api/users'));
 * so all the 'path' defined in this file are effectively prepended with the '/api/users'
 * 
 */
// GET /api/users/check-token
// ensureLoggedIn: This is a middleware function that is used to ensure that the user is logged in 
// !!before allowing access to the route!!

// It is a custom middleware that likely checks the authentication state of the user 
// and redirects them to a login page if they are not logged in.
router.get('/check-token', ensureLoggedIn, usersController.checkToken);

// POST /api/users/login
router.post('/login', usersController.login);

// POST /api/users
router.post('/', usersController.create);

module.exports = router;