import { createContext, useState } from 'react';

/** THIS IS NOT USED AT THE MOMENT - DO NOT KNOW HOW TO USE CONTEXT YET */

/**
 To notify the HomePage component that a search value was entered without cascading the prop function from HomePage to NavBar to SearchComponent,
 you can use a state management library like Redux or React Context. 
 
 This will allow you to manage the search value in a centralized state 
 and access it from any component without passing it as a prop through multiple levels.

 Wrap the HomePage component with the SearchProvider.
 In the SearchComponent, import the SearchContext and use the useContext hook to access the search value
 In the HomePage component, import the SearchContext and use the useContext hook to access the search value:
 */


 /*
In this code, you are creating the SearchContext using the createContext() function. 
Then, the SearchProvider component is defined to wrap around the child components and
provide the searchValue and setSearchValue values to them through the SearchContext.Provider.
The searchValue is initialized with null as the default value using the useState() hook.
 */

const SearchContext = createContext({
  searchValue: '',
  setSearchValue: () => {},
});

const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState(null);

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
