import React from 'react'
import useGenres from '../../hooks/useGenres'

const GameGenresList = () => {

    const { data: genres } = useGenres();

    return (
        <ul>
            {genres.map(genres => <li key={genres.id}>{genres.name}</li>)}
        </ul>
    )
}

export default GameGenresList