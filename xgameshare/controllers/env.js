

module.exports = {
    getEnvVariables
};

/**
 * Returns variables from the .env file in a json response.
 */
async function getEnvVariables(req, res) {
    res.json(({
        TWITCH_AUTH_URL: process.env.TWITCH_AUTH_URL,
        TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
        TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET
    }));
}
