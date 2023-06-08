import React from 'react'
import useGenres from '../../hooks/useGenres'
import { Button } from 'react-bootstrap';

const GameGenresList = () => {

    const { data: genres } = useGenres();

    return (
        <ul>
            {genres.map(genre => (
                <li key={genre.id}>
                     <Button onClick={() => console.log(genre)} variant="link">
                        {genre.name}
                    </Button>
                </li>
            ))}
        </ul>
    )
}

export default GameGenresList