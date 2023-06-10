import * as igdbService from '../services/games/igdb/igdb-service';
import { getGamePayload, getGamePlatformIdsPayload } from "./hookHelpers";
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

        const platformIds = gamesData.map(game => game.platforms);
        const platformPayload = getGamePlatformIdsPayload(platformIds);
        const platformData = await igdbService.getData("/platforms", platformPayload);

        const gamesWithPlatforms = gamesData.map(game => {
          const platform = platformData.find(platform => platform.id === game.platform);
          return {
            ...game,
            platformName: platform?.name || '',
          };
        });

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