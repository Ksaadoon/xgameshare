import React from 'react'
import useGenres from '../../hooks/useGenres'
import { ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

/*
    The GameGenresList component is receiving a prop : onSelectGenre which is a function.
    The function is defined at the parent level of this component which is HomePage.
*/
const GameGenres = ({ onSelectGenre, selectedGenre }) => {

    const { genres, loading } = useGenres();


    if (loading) return <Spinner />;

    return (
        <ListGroup>
            {genres.map(genre => (

                <ListGroupItem  key={genre.id} onClick={() => onSelectGenre(genre)}  className={genre.id === selectedGenre?.id ? 'active' : ''}>
                    {genre.name}
                </ListGroupItem>

            ))}
        </ListGroup>
    )
}

/*
    THe GameGenreList component is where the value can change (when clicking on a genre).
    So in the GameGenreList component we need to add a prop for passing the callback function.
    
    This defines a prop part of this component name onSelectGenre.
    This prop is a function.

    PROP definition: input passed to a component.
    Similar to an argument acting as a function. It is immutable. Once passed, you cannot change the function.

    The prop is passed as argument on line 6.

*/
GameGenres.propTypes = {
    onSelectGenre: PropTypes.func.isRequired,
    selectedGenre: PropTypes.object,
};

export default GameGenres