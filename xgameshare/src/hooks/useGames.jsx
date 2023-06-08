import useData from "./useData";

const useGames = (selectedGenre) => {
    return useData("/games", selectedGenre?.id);
}
export default useGames