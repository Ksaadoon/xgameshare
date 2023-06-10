import PropTypes from 'prop-types';
import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import "./Game.css";
import imageplaceholder from '../../assets/imageplaceholder.webp';
import getCroppedImageUrl from '../../services/games/igdb/images-url';
import GameRating from './GameRating';
import { roundupNumber } from '../../utilities/data-conversion';

const GameCard = ({ user, game }) => {

  let tooltip = game.summary ? game.summary : "No summary available";

  const renderTooltip = (props) => (

    <Tooltip id="button-tooltip" {...props}>
      {tooltip}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Card >
        <Card.Img variant="top" src={game.cover?.url ? getCroppedImageUrl(game.cover.url) : imageplaceholder} />
        <Card.Body>
          <Card.Title>{game.name}</Card.Title>
          <Card.Text>{game.platformNames}</Card.Text>
          <Card.Text>{game.genreNames}</Card.Text>
          <GameRating rating={roundupNumber(game.aggregated_rating)} />
          {/* only show if user is logged in */}
          {user && (
            <Button variant="primary">add</Button>
          )}
        </Card.Body>
      </Card>
    </OverlayTrigger>
  )
}

GameCard.propTypes = {
  game: PropTypes.object,

};


export default GameCard