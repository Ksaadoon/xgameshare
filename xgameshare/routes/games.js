const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game');


// POST /api/users/login
router.get('/', gameController.index);
router.get('/:id', gameController.display);
router.delete('/:id', gameController.remove);

router.post('/', gameController.save);
