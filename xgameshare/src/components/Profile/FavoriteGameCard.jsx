import PropTypes from 'prop-types';
import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import imageplaceholder from '../../assets/imageplaceholder.webp';
import getCroppedImageUrl from '../../services/games/igdb/images-url';
import GameRating from '../Games/GameRating';
import { roundupNumber } from '../../utilities/data-conversion';
import * as xgameshareService from './../../services/xgameshare/xgameshare-service';


const FavoriteGameCard = (props) => {

  const { key, user, game } = props; 

  let tooltip = game.summary ? game.summary : "No summary available";

  const renderTooltip = (props) => (

    <Tooltip id="button-tooltip" {...props}>
      {tooltip}
    </Tooltip>
  );
  
  const handleClick = async (id) => {
    try {
        const res = await xgameshareService.deleteFavorite(id);
        res.status(200);      

    } catch (error) {
    } finally {
    }
};
  

  return (

    <Card >

      <OverlayTrigger placement="right" overlay={renderTooltip}>
        <Card.Img
          variant="top"
          src={game.cover?.url ? getCroppedImageUrl(game.cover.url) : imageplaceholder}
        />
      </OverlayTrigger>

      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
        <Card.Text>{game.platformNames}</Card.Text>
        <Card.Text>{game.genreNames}</Card.Text>
        <GameRating rating={roundupNumber(game.aggregated_rating)} />

        {/* only show if user is logged in */}
        {user && (
           <Button variant="primary" type="submit" onClick={() => handleClick(game._id)}>
           Remove
       </Button>
        )}


      </Card.Body>
    </Card>

  )
}

FavoriteGameCard.propTypes = {
  user: PropTypes.object,
  game: PropTypes.object,

};

export default FavoriteGameCard