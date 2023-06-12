import useGames from '../../hooks/useGames';
import PropTypes from 'prop-types';
import GameCardContainer from './GameCardContainer';
import GameCard from './GameCard';
import { Container,Col, Row } from 'react-bootstrap';
import GameCardSkeleton from './GameCardSkeleton';

/*
    The Games component is receiving a prop : selectedGenre 
    As opposed to the prop passed to the GameGenre component (which was a function)
    This prop is just a object composed of { genre.id, genre.name }

    same thing for selectedPlatform is also a prop object

    searchText is a prop just made of a string (not an object)
*/
const GameGrid = ({ user, selectedGenre, selectedPlatform, searchText }) => {

  // the prop object is passed to the useGames hook so the backend can do an api called based on its value.
  const { games, loading } = useGames(selectedGenre, selectedPlatform, searchText);
  const skeletonCount = 100;

  return (
    <Container fluid>
      {/* screen size and the number of colums for each 
    xs={1} sm={2} md={3} lg={4} xl={6
    
      VERY IMPORTANT TO ALWAYS HAVE A LOADING CHECK WHEN RENDERING COMPONENT OTHERWISE TONS OF ERRORS HARD TO TRACK */}
      {loading ? (
         <Row xs={1} sm={2} md={3} lg={4} xl={6}>
         {Array.from({ length: skeletonCount }).map((_, index) => (
           <Col key={index}>
             <GameCardSkeleton key={index} />
           </Col>
         ))}
       </Row>
        
      ) : (

        <Row xs={1} sm={2} md={3} lg={4} xl={6}>
          {games.map((game) => (
            <GameCardContainer user={user} key={game.id}>
              <GameCard user={user} game={game} />
            </GameCardContainer>
          ))}
        </Row>


      )}
    </Container>
  )
};

/**
 * Definition of the prop being passed on line 9: This prop is a object.
 * This prop contains all the games json data returns by the IGDB API.
 */
GameGrid.propTypes = {
  selectedGenre: PropTypes.object,
  selectedPlatform: PropTypes.object,
  searchText: PropTypes.string,
};

export default GameGrid;
