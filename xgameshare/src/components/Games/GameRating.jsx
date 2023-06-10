import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

const GameRating = ({ rating }) => {

    let color = rating > 75 ? 'green' : rating > 60 ? 'yellow' : 'red';
    return (
        <Badge colorScheme={color} fontSize='14px' paddingX={2} borderRadius='4px'>{rating}</Badge>
    )
}

GameRating.propTypes = {
    rating: PropTypes.number,
};
export default GameRating