import * as igdbService from '../services/games/igdb/igdb-service';
import { useEffect, useState } from 'react';

const useGenres = () => {

    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const payload = "fields name; limit 100;";

    useEffect(() => {
        const fetchData = async () => {
          try {
           
            const res = await igdbService.getData("/genres", payload);
            setGenres(res);
            setLoading(false);   
    
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };    
        fetchData();

      }, [loading]);

      return { genres, loading };
}
export default useGenres;