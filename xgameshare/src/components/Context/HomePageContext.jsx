import { createContext, useState } from 'react';

export const HomePageContext = createContext();
 
export const HomePageProvider = ({ children }) => {
   
    // const [sortOrderSelection, setSortOrderSelection] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [searchText, setSearchText] = useState(null);
  
    return (
      <HomePageContext.Provider value={{ selectedGenre, setSelectedGenre, selectedPlatform, setSelectedPlatform, searchText, setSearchText }}>
        {children}
      </HomePageContext.Provider>
    );
  };
  
