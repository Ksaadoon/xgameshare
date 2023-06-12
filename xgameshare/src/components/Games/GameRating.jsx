import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

const GameRating = ({ rating }) => {

    let color = "white";
    return rating > 0 ? (
        <Badge style={{ color }}>rating: {rating}</Badge>
      ) : <Badge style={{ color }}>rating: n/a</Badge>
}

GameRating.propTypes = {
    rating: PropTypes.number,
};
export default GameRating