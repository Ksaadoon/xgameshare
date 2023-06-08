import useGames from '../../hooks/useGames';
import PropTypes from 'prop-types';

const Games = ( {selectedGenre} ) => {

  const { data: games, error, loading} = useGames(selectedGenre);

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

Games.propTypes = {
  selectedGenre: PropTypes.object,
};

export default Games;
