// ___________________
// Models
// ___________________
// get access to the Product model
const FavoriteGame = require('../models/favoriteGame');

module.exports = {
  index,
  save,
  remove,
  display,
};

// ALWAYS Ensure that the function in your controller is properly returning a response to the API call.



async function index(req, res) {

}



async function save(req, res) {
  try {

    const igdb_game_id = req.body.igdb_game_id;

    // Check if the game already exists in the database
    const existingGame = await FavoriteGame.findOne({ igdb_game_id });
    if (existingGame) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Favorite Game already exists in the database for this user ',
        existingGame: existingGame
      });
    }
    const favoriteGame = await FavoriteGame.create(req.body);
    res.status(200).json(favoriteGame);

  } catch (err) {
    console.log(err);
    res.send(err)
  }
}

async function display(req, res) {
}

async function remove(req, res) {
}