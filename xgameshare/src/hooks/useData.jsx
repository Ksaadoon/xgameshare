import { useEffect, useState } from 'react';
import * as igdbService from '../services/games/igdb/igdb-service';

const useData = (endpoint) => {
 
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const abortController = new AbortController();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const payload = "fields name; limit 30;";
                const res = await igdbService.listData(endpoint, payload, abortController.signal);
                setData(res); // Update the games state with the response data
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

        fetchData();

        return () => {
            // Cleanup function to abort the request when the component unmounts
            abortController.abort();
          };

    }, []);

    return { data, error, loading }
}

export default useData;