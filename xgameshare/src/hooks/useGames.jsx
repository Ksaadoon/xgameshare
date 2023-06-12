import * as igdbService from '../services/games/igdb/igdb-service';
import { getGamePayload, getGamePlatformIdsPayload , addPlatformGenresNames} from "./hookHelpers";
import { useEffect, useState } from 'react';

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

        // The variable platformIds is an array of arrays.        
        const platformIds = gamesData.map(game => game.platforms);
        // console.log("plat: " + platformIds);
        const platformPayload = getGamePlatformIdsPayload(platformIds);
        // console.log("join: " + platformPayload);
        const platformData = await igdbService.getData("/platforms", platformPayload);

        //genre is a short list so ok to use all of them.
        const genrePayload = "fields name; limit 100;";
        const genreData =  await igdbService.getData("/genres", genrePayload);          

        const gamesWithPlatormAndGenresNames = addPlatformGenresNames(gamesData, platformData, genreData);

        setGames(gamesWithPlatormAndGenresNames);
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