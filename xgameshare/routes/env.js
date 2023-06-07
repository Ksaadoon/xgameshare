
const express = require('express');
const router = express.Router();
const envController = require('../controllers/env');

// An endpoint on the express server to return the variables defined in the .env file
// so the variables can be used in a react component.

//OBSOLETE SINCE https://create-react-app.dev/docs/adding-custom-environment-variables see .env file
router.get('/', envController.getEnvVariables);

module.exports = router;