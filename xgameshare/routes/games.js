const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game');
//const ensureLoggedIn = require('../helpers/ensureLoggedin')

/*
    Router for managing favorite games.
*/
router.get('/', gameController.index);
router.get('/:id', gameController.display);
router.delete('/:id', gameController.remove);

router.post('/', gameController.save);


module.exports = router;
