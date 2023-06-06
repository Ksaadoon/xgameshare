const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = {
  create,
  login,
  checkToken
};

/**
 * Creating a new user in the database, and creating a token after
 * @param {*} req 
 * @param {*} res 
 */
async function create(req, res) {
 
  try {
    //before creating account , make sure the email is not already used
    const isUser = await User.findOne({email: req.body.email});
    if( isUser ) {
      throw new Error("Email address already taken.");
    }
    const user = await User.create(req.body);

    const token = createJWT(user);
    if ( token === null) {
      throw new Error("JWT token creation failed.")
    }
    // The token is a string, but yes, we can res.json a string
    res.json(token);

  } catch (err) {
     res.status(400).json({ error: "Error creating user", details: err.message });  
  }
}

/*
 * Finds a user in the dabase based on an email address
 * check the password provided in the request body with the one in database for that user
 * create a new authentication token if all good and returns it
 * @param {*} req 
 * @param {*} res 
 */
async function login(req, res) {
   try {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}


// ------------------------ //
// Helper Functions
// ------------------------ //

// it returns a signed token for that user valid for 24h

/**
 * The resulting token is a string that consists of three (3) parts: 
   the header,
   the payload (which includes the user data and expiration time), 
   and the signature. 
 * 
 */
function createJWT(user) {
  return jwt.sign(
    { user },                        // Payload: Data to be included in the token
    process.env.XGAMESHARE_SECRET,   // Secret key used for signing the token
    { expiresIn: '24h' }             // Token expiration time
  );
}


function checkToken(req, res) {
  console.log(req.user);
  res.json(req.exp);
}
