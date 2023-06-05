const express = require('express');
const router = express.Router();
const twitchController = require('../controllers/twitchAuth');

router.post('/', twitchController.auth);

module.exports = router;
