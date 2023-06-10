import React from 'react'
import { Card } from 'react-bootstrap';
import "./Game.css";

const GameCardContainer = ({children}) => {
  return (

      <Card rounded >
        {children}
      </Card>

  )
}
export default GameCardContainer