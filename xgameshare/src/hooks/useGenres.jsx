import { useEffect, useState } from 'react';
import * as igdbService from '../services/games/igdb/igdb-service';

const useGenres = () => {
 
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const abortController = new AbortController();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const payload = "fields name; limit 30;";
                const res = await igdbService.listGenres(payload, abortController.signal);
                setGenres(res); // Update the games state with the response data
                setLoading(false); // Set loading to false after successful fetch

            } catch (error) {
                if (error.name === 'AbortError') {
                    return;
                } else {
                    setError('Failed to fetch games'); // Update the error state with an error message
                    setLoading(false); // Set loading to false after failed fetch
                }
            }
        };

        fetchGenres();

        return () => {
            // Cleanup function to abort the request when the component unmounts
            abortController.abort();
          };

    }, []);

    return { genres, error, loading }
}

export default useGenres