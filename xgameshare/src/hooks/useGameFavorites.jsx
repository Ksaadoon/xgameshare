import * as igdbService from '../services/games/igdb/igdb-service';
import { getFavoriteGamesPayload, addPlatformGenresNames, getGamePlatformIdsPayload } from "./hookHelpers";
import { useEffect, useState } from 'react';
import * as xgameshareService from './../services/xgameshare/xgameshare-service';

// custom hooks cannot be marked as async directly.
const useGameFavorites = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {

        let favoriteGames = await xgameshareService.getFavorites();
        if (favoriteGames.length > 0 ) {

        const igdbIds = favoriteGames.map(fav => fav.igdb_game_id);
        const payload = getFavoriteGamesPayload(igdbIds);
        let gamesData = await igdbService.getData("/games", payload);

        const platformIds = gamesData.map(game => game.platforms);
        const platformPayload = getGamePlatformIdsPayload(platformIds);
        const platformData = await igdbService.getData("/platforms", platformPayload);

        const genrePayload = "fields name; limit 100;";
        const genreData = await igdbService.getData("/genres", genrePayload);

        const gamesWithPlatormAndGenresNames = addPlatformGenresNames(gamesData, platformData, genreData);

        // Add fav._id to gamesWithPlatformAndGenresNames
        const gamesWithId = gamesWithPlatormAndGenresNames.map(game => {
          const matchingFavoriteGame = favoriteGames.find(fav => fav.igdb_game_id === game.id);
          if (matchingFavoriteGame) {
            return {
              ...game,
              _id: matchingFavoriteGame._id
            };
          }
          return game;
        });
        setGames(gamesWithId);
      }        
      setLoading(false);


      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //leave the dependencies array empty []. This ensures that the effect is only run once when the component is mounted.

  return { games, loading };
};

export default useGameFavorites;