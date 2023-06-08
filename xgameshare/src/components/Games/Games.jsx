import useGames from '../../hooks/useGames';

const Games = () => {

  const { games, error, loading} = useGames();

  return (
    <div>
      {loading ? (
        // Render a loading indicator or placeholder
        <div>Loading games...</div>
      ) : error ? (
        // Render the error message
        <div>{error}</div>
      ) : games.length > 0 ? (
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

export default Games;
