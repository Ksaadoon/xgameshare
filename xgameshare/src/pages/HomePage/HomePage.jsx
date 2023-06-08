import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent';
import Games from '../../components/Games/Games';
import GameGenresList from '../../components/Games/GameGenresList';
import { useState } from 'react';
import PlatformSelector from '../../components/Selectors/PlatformSelector';
import SortSelector from '../../components/Selectors/SortSelector';


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

  return (
    <>
      <Container>
        <Row>
          <Col>
            <NavBarComponent setUser={setUser} user={user} onSearch={(searchText) => setSearchText(searchText)}/>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* (platform) => setSelectedPlatform(platform): 
                    this is a function that takes a platform as parameter and calls the state method setSelectedPlatform.
                It is a prop function!
              */}
            <PlatformSelector onSelectPlatform={(platform) => setSelectedPlatform(platform)}/>
            {/* (genre) => setSelectedGenre(genre): 
                    this is a function that takes a genre as parameter and calls the state method setSelectedGenre.
                It is a prop function!
              */}
            <GameGenresList onSelectGenre={(genre) => setSelectedGenre(genre)} />
          </Col>
          <Col>
              <SortSelector/>
          </Col>
          <Col>
            {/* We need to pass the selected genre to the GameComponent so it can be passed to the backend 
                while fetching the games.So we are passing a prop to the Games component.
                It is a prop object! (same thing with selectedPlatorm)
                searchValue is a prop string
             */}
            <Games selectedGenre={selectedGenre} selectedPlatform={selectedPlatform} searchText={searchText} />           
          </Col>
        </Row>
      </Container>
    </>
  );
}
