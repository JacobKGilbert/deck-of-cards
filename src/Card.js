import React from 'react'
import './Card.css'

const Card = ({ id, cardImg, zIdx, position }) => {
  return (
    <img 
      id={id}
      src={cardImg}
      alt='card'
      style={{ zIndex: zIdx, transform: position}} 
    />
  )
}

export default Card