import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import "./Game.css";
import imageplaceholder from '../../assets/imageplaceholder.webp';
import getCroppedImageUrl from '../../services/games/igdb/images-url';

const GameCard = ({ game }) => {

  return (
    <Card>
      <Card.Img rounded variant="top" src={game.cover?.url ? getCroppedImageUrl(game.cover.url) : imageplaceholder} />
      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
        <Button variant="primary">add</Button>
      </Card.Body>
    </Card>
  )
}

GameCard.propTypes = {
  game: PropTypes.object,

};


export default GameCard