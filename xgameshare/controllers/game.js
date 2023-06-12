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


// const jwt = require('jsonwebtoken');

// async function index(req, res) {
//   try {
//     // Extract the token from the authorization header
//     const token = req.headers.authorization.split(' ')[1];

//     const decodedToken = jwt.verify(token, process.env.XGAMESHARE_SECRET); // Replace 'your_secret_key' with your actual secret key

//     // Retrieve favorite games for the specified user ID
//     const favs = await FavoriteGame.find({ user: decodedToken.user });

//     return res.status(200).json(favs);
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

//IMPORTANT ._id (mongodb ids )
async function index(req, res) {
  try {
    const userId = req.user._id; // Assuming the user ID is provided in the request body
    const favs = await FavoriteGame.find({ user: userId }); // Retrieve favorite games for the specified user ID
    return res.status(200).json(favs);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function save(req, res) {
  try {

    const igdb_game_id = req.body.igdb_game_id;
    req.body = {
      ...req.body,
      user: req.user,
    }


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
  try {
    await FavoriteGame.findByIdAndDelete(req.params.id)
    res.status(200);
  
  } catch (err) {
    res.send(err)
  }
}