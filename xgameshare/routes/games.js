const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game');
const ensureLoggedIn = require('../helpers/ensureLoggedin')

/*
    Router for managing favorite games.
*/
router.get('/', ensureLoggedIn, gameController.index);
router.get('/:id', ensureLoggedIn, gameController.display);
router.delete('/:id', ensureLoggedIn, gameController.remove);

router.post('/', ensureLoggedIn, gameController.save);


module.exports = router;
