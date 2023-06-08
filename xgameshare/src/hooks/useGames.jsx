import useData from "./useData";

const useGames = (selectedGenre, selectedPlatform) => {
    return useData("/games", selectedGenre?.id, selectedPlatform?.id);
}
export default useGames