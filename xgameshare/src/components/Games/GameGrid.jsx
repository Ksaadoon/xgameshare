import useGames from '../../hooks/useGames';
import PropTypes from 'prop-types';
import GameCardContainer from './GameCardContainer';
import GameCard from './GameCard';
import { Container, Row, Col } from 'react-bootstrap';

/*
    The Games component is receiving a prop : selectedGenre 
    As opposed to the prop passed to the GameGenre component (which was a function)
    This prop is just a object composed of { genre.id, genre.name }

    same thing for selectedPlatform is also a prop object

    searchText is a prop just made of a string (not an object)
*/
const GameGrid = ({ selectedGenre, selectedPlatform, searchText }) => {

  // the prop object is passed to the useGames hook so the backend can do an api called based on its value.
  const { data: games, error, loading } = useGames(selectedGenre, selectedPlatform, searchText);

  return (
    <Container fluid>
      {/* screen size and the number of colums for each */}
      <Row xs={1} sm={2} md={3} lg={4} xl={6}>

      {games.map((game) => (
              <GameCardContainer key={game.id}>
                <GameCard game={game} />
              </GameCardContainer>
      ))}
        
      </Row>
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
