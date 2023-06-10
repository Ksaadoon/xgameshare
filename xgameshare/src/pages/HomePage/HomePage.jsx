import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import GameGenres from '../../components/Games/GameGenres';
import GameGrid from '../../components/Games/GameGrid';
import { useState } from 'react';
import PropTypes from 'prop-types';
import PlatformSelector from '../../components/Selectors/PlatformSelector';
import SortSelector from '../../components/Selectors/SortSelector';
import GameHeading from '../../components/Games/GameHeading';


export default function HomePage({ setUser, user }) {


  /* To display the list of games based on a genre selected we have to share a state between those 2 components.

  To share a state between 2 components we have to lift the state variable up to the closest parent between
  those 2 components. 
  The shared parent of GameGenreList component and Games component is the HomePage component.
  Thus, the HomePage component is the place to store the state of the selected genre.  */
  const [selectedGenre, setSelectedGenre] = useState(null);  //state variable for selectedGenre to keep track of the selected genre


  /*
    STATE definition: is data managed by a component. HomePage is responsible to manage the selectedGenre state variable.
    a state is similar to a local variable and is mutable (its value can change)

    THe GameGenreList component is where the value can change (when clicking on a genre).
    So in the GameGenreList component we need to add a prop for passing the callback function.
  */


  // state variable for selectedPlatform to keep track of the selected platform
  // when the platform changes, it will be passed to the Games component for filtering

  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const [searchText, setSearchText] = useState(null);

  const clearSearchText = () => {
    setSearchText(''); // Clear the state variable searchText
  };
  
  const [sortOrderSelection, setSortOrderSelection] = useState('');


  return (
    <>
      <div className='homepage'>
        <NavBarComponent setUser={setUser} user={user} onSearch={(searchText) => setSearchText(searchText)} clearSearchText={clearSearchText}/>
        <Container fluid>
          <Row>
            {/* d-none = display:none but it is not active if the size is greater than a device with d-mb-block */}
            <Col md={3} className='d-none d-md-block'>
              {/* (genre) => setSelectedGenre(genre): 
                    this is a anonymous function that takes a genre as parameter and calls the state method setSelectedGenre.
                It is a prop function!
              */}
              <GameGenres onSelectGenre={(genre) => setSelectedGenre(genre)} selectedGenre={selectedGenre} />
            </Col>
            <Col md={9}>
              <Row>
                <GameHeading selectedGenre={selectedGenre} selectedPlatform={selectedPlatform} />
                <Col md={3}>
                  {/* (platform) => setSelectedPlatform(platform): 
                    this is a anonymous function that takes a platform as parameter and calls the state method setSelectedPlatform.
                It is a prop function!
              */}
                  <PlatformSelector onSelectPlatform={(platform) => setSelectedPlatform(platform)} selectedPlatform={selectedPlatform} />
                </Col>
                <Col md={3}>
                  <SortSelector onSortOrder={(sortOrderSelection) => setSortOrderSelection(sortOrderSelection)} sortOrderSelection={sortOrderSelection}/>
                  {/* We need to pass the selected genre to the GameComponent so it can be passed to the backend 
                while fetching the games.So we are passing a prop to the Games component.
                It is a prop object! (an object because it has inside a name and an id (selectedGenre.name, selectedGenre.id)) (same thing with selectedPlatorm)
                searchText is a prop string (just the string typed inside the search bar)
             */}
                </Col>
              </Row>
              <GameGrid selectedGenre={selectedGenre} selectedPlatform={selectedPlatform} sortOrderSelection={sortOrderSelection} searchText={searchText} />
            </Col>
          </Row>
        </Container>
        <footer className="footer">
          Footer
        </footer>
      </div>
    </>
  );
}



HomePage.propTypes = {
  clearSearchText: PropTypes.func,
};
