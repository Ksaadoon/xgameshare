import useData from './useData';

const usePlatforms = () => {
  
    return useData("/platform_families");
  
}

export default usePlatforms