import React from 'react'
import { Card } from 'react-bootstrap';
import "./Game.css";

const GameCardContainer = ({children}) => {
  return (

      <Card>
        {children}
      </Card>

  )
}
export default GameCardContainer