import { useEffect, useState } from 'react';
import * as igdbService from '../services/games/igdb/igdb-service';
import usePayload from './usePayload';

const useData = (endpoint, selectedGenre, selectedPlatform, sortOrder, searchText) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const abortController = new AbortController();
    
    const payload = usePayload(endpoint, selectedGenre, selectedPlatform, sortOrder, searchText);

    useEffect(() => {
        const fetchData = async () => {
            try {
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

    }, [endpoint, payload]);

    /*
        To ensure that the setPayload function is called to update the payload when the selectedGenre prop changes, 
        you need to include the selectedGenre as a dependency in the useEffect hook [endpoint, selectedGenre]. 
        This will trigger the effect whenever the selectedGenre prop value changes.
    */

    return { data, error, loading }
}

export default useData;