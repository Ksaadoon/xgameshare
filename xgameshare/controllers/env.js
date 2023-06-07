
//OBSOLETE SINCE 
//https://create-react-app.dev/docs/adding-custom-environment-variables/ see .env file
module.exports = {
    getEnvVariables
};

/**
 * Returns variables from the .env file in a json response.
 */
async function getEnvVariables(req, res) {
    res.json(({
        // LOCALHOST: process.env.LOCALHOST,
        // HEROKU: process.env.HEROKU,
        // HEROKU_PORT: process.env.HEROKU_PORT,
        // SERVER_PORT: process.env.SERVER_PORT,
        // SERVER_HTTP: process.env.SERVER_HTTP,
        // SERVER_HTTPS: process.env.SERVER_HTTPS,
        // REACT_PROXY_PACKAGE_JSON: process.env.REACT_PROXY_PACKAGE_JSON,
        // IGDB_BASE_URL: process.env.IGDB_BASE_URL,
        // IGDB_PROXY_BASE_PATH: process.env.IGDB_PROXY_BASE_PATH     
    }));
}
