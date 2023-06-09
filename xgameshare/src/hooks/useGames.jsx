import useData from "./useData";

const useGames = (selectedGenre, selectedPlatform, sortOrder, searchText) => {
    return useData("/games", selectedGenre?.id, selectedPlatform?.id, sortOrder, searchText);
}
export default useGames