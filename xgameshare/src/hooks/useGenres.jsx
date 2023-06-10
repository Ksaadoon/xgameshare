import useData from './useData';

const useGenres = () => {
    const payload = "fields name; limit 100;";

    return useData("/genres", payload);
}

export default useGenres