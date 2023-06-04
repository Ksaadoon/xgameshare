
const express = require('express');
const router = express.Router();
const envController = require('../controllers/env');

// An endpoint on the express server to return the variables defined in the .env file
// so the variables can be used in a react component.
router.get('/', envController.getEnvVariables);

module.exports = router;