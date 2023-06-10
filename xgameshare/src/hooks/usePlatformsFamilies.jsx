import * as igdbService from '../services/games/igdb/igdb-service';
import { useEffect, useState } from 'react';

export const usePlatformsFamilies = () => {

    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);
    const payload = "fields name; limit 100;";

    useEffect(() => {
        const fetchData = async () => {
          try {
           
            const res = await igdbService.getData("/platform_families", payload);
            setPlatforms(res);
            setLoading(false);   
    
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };    
        fetchData();

      }, [loading]);

      return { platforms, loading };
}
export default usePlatformsFamilies;