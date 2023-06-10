import useData from './useData';

const usePlatforms = () => {
  
    const payload = "fields name; limit 100;";

    return useData("/platform_families", payload);
  
}

export default usePlatforms