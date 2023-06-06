import React, { useEffect, useState } from 'react'
import * as igdbService from '../../services/games/igdb/igdb-service';

const Games = ({twitchAccessToken}) => {

  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const res = igdbService.listGames();
  });

  

  return (
    <div>Games</div>
  )
  }

export default Games