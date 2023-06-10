import useData from "./useData";
import useGamePayload from "./useGamePayload";
import { useGamePlatformIdsPayload } from "./useGamePlatformPayload";

  const useGames = (selectedGenre, selectedPlatform, searchText, sortOrder) => {

    console.log("useGames input: genre:" + selectedGenre?.id + " platform: " + selectedPlatform?.id + " search: " + searchText +  " sortOrder: " + sortOrder);
    const gamesEndpoint = "/games";
    // get the selections for create the payload and return games matching the selections
    let payload = useGamePayload(selectedGenre, selectedPlatform, searchText);
    // fetch the games 
    const gamesData = useData(gamesEndpoint, payload);

    // // Extract the platform IDs from the games data
    // const platformIds = gamesData.map(game => game.platforms);

    // // build the payload for the platform
    // payload = useGamePlatformIdsPayload(platformIds);
    
    // // fetch the platform data
    // const platformData = useData("/platforms", payload);

    //  // Merge the platform details into the games data
    //  const gamesWithPlatforms = gamesData.map(game => {
    //     const platform = platformData.find(platform => platform.id === game.platform);
    //     return {
    //       ...game,
    //       platformName: platform?.name || '',
    //     };
    //   });

      return gamesData;


}
export default useGames