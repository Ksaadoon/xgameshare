import GameCardContainer from './../Games/GameCardContainer'
import { Container, Row } from 'react-bootstrap';
import FavoriteGameCard from './FavoriteGameCard';

const FavoriteGameGrid = ({ user, games, loading }) => {

  return (
    <Container fluid>
      {/* screen size and the number of colums for each 
    xs={1} sm={2} md={3} lg={4} xl={6
    */}


      {/* VERY IMPORTANT TO ALWAYS HAVE A LOADING CHECK WHEN RENDERING COMPONENT OTHERWISE TONS OF ERRORS HARD TO TRACK
      
          Also s, you can access the key prop inside the FavoriteGameCard component. 
          The key prop is a special prop provided by React when rendering a list of elements, and it is not accessible via props like regular props.
          To access the key prop inside the FavoriteGameCard component, 
          you can use the second argument of the functional component declaration, which represents the component's props. 
          The key prop will be available as a property on the props object.
          HOWEVER: key prop represents the special key assigned by React for list reconciliation purposes, and it should not be used as a data prop.
      
      */}
      {loading ? (
        <p>Loading favorite games...</p>
      ) : (
        <>
        <Row xs={1} sm={2} md={3} lg={4} xl={6}>
          {games.map((game) => (
            <GameCardContainer user={user} key={game._id}>
              <FavoriteGameCard user={user} game={game} />
            </GameCardContainer>
          ))}
        </Row>
        </>
      )}
    </Container>
  )
};

export default FavoriteGameGrid;
