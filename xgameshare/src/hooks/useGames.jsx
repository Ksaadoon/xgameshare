import * as igdbService from '../services/games/igdb/igdb-service';
import { getGamePayload, getGamePlatformIdsPayload } from "./hookHelpers";
import { useEffect, useState } from 'react';
import useGenres from './useGenres';

// custom hooks cannot be marked as async directly.
const useGames = (selectedGenre, selectedPlatform, searchText, sortOrder) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("useGames input: genre:" + selectedGenre?.id + " platform: " + selectedPlatform?.id + " search: " + searchText + " sortOrder: " + sortOrder);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const payload = getGamePayload(selectedGenre, selectedPlatform, searchText);
        const gamesData = await igdbService.getData("/games", payload);

        const platformIds = gamesData.map(game => game.platforms);
        const platformPayload = getGamePlatformIdsPayload(platformIds);
        const platformData = await igdbService.getData("/platforms", platformPayload);

        //genre is a short list so ok to use all of them.
        const genrePayload = "fields name; limit 100;";
        const genreData =  await igdbService.getData("/genres", genrePayload);          

        //Go through the list of games to get the list of their platfrom ids.
        // Then from the platform data find the corresponding id, and inject
        // the name of the platform inside the game data.
        const gamesWithPlatforms = gamesData.map(game => {
          const platformNames = game.platforms.map(platformId => {
            const platform = platformData.find(platform => platform.id === platformId);
            return platform ? platform.name : '';
          });
          return {
            ...game,
            platformNames: platformNames,
          };
        });


        //Same thing for genres
        const gamesWithPlatormAndGenresNames = gamesData.map(game => {
          const genreNames = game.genres.map(genreId => {
            const genre = genreData.find(genre => genre.id === genreId);
            return genre ? genre.name : '';
          });
          return {
            ...game,
            genreNames: genreNames,
          };
        });

        console.log(gamesWithPlatormAndGenresNames);


        setGames(gamesWithPlatforms);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedGenre, selectedPlatform, searchText]);

  return { games, loading };
};

export default useGames;