import React from 'react'
import useGenres from '../../hooks/useGenres'
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const GameGenresList = ({ onSelectGenre }) => {

    const { data: genres } = useGenres();
 
    return (
        <ul>
            {genres.map(genre => (
                <li key={genre.id}>
                    <Button onClick={() => onSelectGenre(genre)} variant="link">
                        {genre.name}
                    </Button>
                </li>
            ))}
        </ul>
    )
}

GameGenresList.propTypes = {
    onSelectGenre: PropTypes.func.isRequired,
  };

export default GameGenresList