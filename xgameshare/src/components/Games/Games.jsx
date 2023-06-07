import React, { useEffect, useState } from 'react'
import * as igdbService from '../../services/games/igdb/igdb-service';


const Games = () => {

  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {

    const fetchGames = async () => {
      try {

        const payload = "fields name; limit 30;";
        const res = await igdbService.listGames(payload);
        console.log(res); // Log the response object to check its structure
        setGames(res); // Update the games state with the response data
      } catch (error) {
        setError('Failed to fetch games'); // Update the error state with an error message
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      {games.length > 0 ? (
        // Render the list of games
        <ul>
          {games.map((game) => (
            <li key={game.id}>{game.name}</li>
          ))}
        </ul>
      ) : error ? (
        // Render the error message
        <div>{error}</div>
      ) : (
        // Render a loading indicator or placeholder
        <div>Loading games...</div>
      )}
    </div>
  );
}

export default Games;