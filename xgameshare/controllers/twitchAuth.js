require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    auth
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {
 *  "access_token": "anEncryptedCode",
 *  "expires_in": aNumber,
 *  "token_type": "bearer"
 * }
 * 
 * example of the twitch authentication API call return in json format:
        {
            "access_token": "j2fr55iqoz74qg5zwa0bc15o3m1jot",
            "expires_in": 5412302,
            "token_type": "bearer"
        }
 */
async function auth(req, res) {
    try {
        const response = await fetch(process.env.TWITCH_AUTH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                grant_type: 'client_credentials',
            }),
        });
        //!!!!!!!Important here to await for json formatting!!!!!!!!
        const { access_token, expires_in } = await response.json();

        // Create JWT using the access_token and sign it with the secret key from twitch
        const jwtToken = createJWT(access_token, expires_in);
        //console.log("access_token" + jwtToken);
        // Return the JWT as a response
        res.json({ jwtToken });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get twitch access token' });
    }

};

// ------------------------ //
// Helper Functions
// ------------------------ //

// it returns a signed token 
function createJWT(access_token, expires_in) {
    return jwt.sign(
      // extra data for the payload
      { access_token },
      process.env.TWITCH_CLIENT_SECRET,
      { expiresIn: expires_in }
    );
  }
  