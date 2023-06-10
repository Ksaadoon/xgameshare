import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

const GameRating = ({ rating }) => {

    let color = rating > 75 ? 'green' : rating > 60 ? 'yellow' : 'red';
    return rating > 0 ? (
        <Badge style={{ color }}>{rating}</Badge>
      ) : null
}

GameRating.propTypes = {
    rating: PropTypes.number,
};
export default GameRating