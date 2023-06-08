import useData from "./useData";

const useGames = (selectedGenre, selectedPlatform, searchText) => {
    return useData("/games", selectedGenre?.id, selectedPlatform?.id, searchText);
}
export default useGames