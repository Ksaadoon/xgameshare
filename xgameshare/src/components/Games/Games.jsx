import useGames from '../../hooks/useGames';
import PropTypes from 'prop-types';

/*
    The Games component is receiving a prop : selectedGenre 
    As opposed to the prop passed to the GameGenreList component (which was a function)
    This prop is just a object.
*/
const Games = ( {selectedGenre, selectedPlatform, searchText}) => {

  // the prop object is passed to the useGames hook so the backend can do an api called based on its value.
  const { data: games, error, loading} = useGames(selectedGenre, selectedPlatform, searchText);

  return (
    <div>
      {loading ? (
        // Render a loading indicator or placeholder
        <div>Loading games...</div>
      ) : error ? (
        // Render the error message
        <div>{error}</div>
      ) : games && games.length > 0 ? (
        // Render the list of games
        <ul>
          {games.map((game) => (
            <li key={game.id}>{game.name}</li>
          ))}
        </ul>
      ) : (
        // Render a message when there are no games
        <div>No games found</div>
      )}
    </div>
  );
};

/**
 * Definition of the prop being passed on line 9: This prop is a object. 
 */
Games.propTypes = {
  selectedGenre: PropTypes.object,
  selectedPlatform: PropTypes.object,
  searchText: PropTypes.string,
};

export default Games;
