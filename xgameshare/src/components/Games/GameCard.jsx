import PropTypes from 'prop-types';
import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import "./Game.css";
import imageplaceholder from '../../assets/imageplaceholder.webp';
import getCroppedImageUrl from '../../services/games/igdb/images-url';
import GameRating from './GameRating';


const GameCard = ({ game }) => {

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
     {game.summary}
    </Tooltip>
  );

  return (
    <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip}
  >
    <Card >
      <Card.Img  variant="top" src={game.cover?.url ? getCroppedImageUrl(game.cover.url) : imageplaceholder} />
      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
        <GameRating rating={game.aggregated_rating}/>
        <Button variant="primary">add</Button>
      </Card.Body>
    </Card>
    </OverlayTrigger>
  )
}

GameCard.propTypes = {
  game: PropTypes.object,

};


export default GameCard