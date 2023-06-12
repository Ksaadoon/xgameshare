import PropTypes from 'prop-types';
import { Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
import "./Game.css";
import imageplaceholder from '../../assets/imageplaceholder.webp';
import getCroppedImageUrl from '../../services/games/igdb/images-url';
import GameRating from './GameRating';
import { roundupNumber } from '../../utilities/data-conversion';
import GameForm from './GameForm';

const GameCard = ({ user, game }) => {

  let tooltip = game.summary ? game.summary : "No summary available";

  const renderTooltip = (props) => (

    <Tooltip id="button-tooltip" {...props}>
      {tooltip}
    </Tooltip>
  );

  return (

    <Card >

      <OverlayTrigger placement="right" overlay={renderTooltip}>
        <Card.Img
          variant="top"
          src={game.cover?.url ? getCroppedImageUrl(game.cover.url) : imageplaceholder}
        />
      </OverlayTrigger>



      <Card.Body>
        <Card.Title className="game-title">{game.name}</Card.Title>
        <Card.Text>{game.platformNames}</Card.Text>
        <Card.Text>{game.genreNames.join(", ")}</Card.Text>
        
          <GameRating rating={roundupNumber(game.aggregated_rating)} />

          {user && (
            <div className="ml-auto">
              <p></p>
              <GameForm game={game} />
            </div>
          )}
        
        {/* <div className="d-flex justify-content-evenly rating-button-container">
          <div className="rating-container">
            <GameRating rating={roundupNumber(game.aggregated_rating)} />
          </div>
          {user && <GameForm game={game} />}
        </div>   */}


      </Card.Body>
    </Card>

  )
}

GameCard.propTypes = {
  game: PropTypes.object,

};


export default GameCard