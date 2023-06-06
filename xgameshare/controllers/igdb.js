require('dotenv').config();


module.exports = {
    listGames
};

async function listGames(req, res) {

    const clientId = process.env.TWITCH_CLIENT_ID;
    const idgbUrl = process.env.IGDB_BASE_URL + req.url;
   
    const addHeaders = {
       headers: {
            ...req.headers,
            'Client-ID': `${clientId}`
        }
    };

   
    try {
        console.log(addHeaders);
        const response = await fetch(idgbUrl, addHeaders);     
        const data = await response.json();  
        res.json(data);

      } catch (error) {
        console.log(req.headers);
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}





