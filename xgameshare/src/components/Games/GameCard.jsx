import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Card, Button} from 'react-bootstrap';
import * as igdbService from '../../services/games/igdb/igdb-service';
import "./Game.css";

const GameCard = ({game}) => {

   return (
    <Card>
        <Card.Img variant="top" src={game.cover.url}/>
        <Card.Body>
        <Card.Title>{game.name}</Card.Title>
        <Card.Text>
          {game.summary}
          
        </Card.Text>
        <Button variant="primary">add</Button>
      </Card.Body>
    </Card>
  )
}

GameCard.propTypes = {
    game: PropTypes.object,

  };
  

export default GameCard