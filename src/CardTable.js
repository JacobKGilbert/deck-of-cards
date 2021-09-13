import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Card from './Card'

const CardTable = () => {
  const [cards, setCards] = useState([])
  const [zIdx, setZIdx] = useState(1)
  // Part One and Two
  const [showDrawBtn, setShowDrawBtn] = useState(true)
  // Part Two
  const [showStopBtn, setShowStopBtn] = useState(false)
  const deck_id = useRef()
  const intervalId = useRef()

  useEffect(() => {
    async function getDeck() {
      const res = await axios.get(
        'http://deckofcardsapi.com/api/deck/new/shuffle/'
      )
      const deck = res.data
      deck_id.current = deck.deck_id
    }
    getDeck()
  }, [])

  // Part One handleClick
  // const handleClick = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://deckofcardsapi.com/api/deck/${deck_id.current}/draw/?count=1`
  //     )
  //     const draw = res.data

  //     const remainingInDeck = draw['remaining']

  //     if (remainingInDeck === 0) {
  //       setShowDrawBtn(!showDrawBtn)
  //       alert('Deck is empty')
  //     }

  //     const position = getPosition()

  //     const newCard = {...draw.cards[0], zIdx, position }
  //     setZIdx(zIdx + 1)
  //     setCards(() => [...cards, newCard])
  //   } catch (err) {
  //     alert(err)
  //   }
  // }

  // Part Two handleClick
  const handleDrawClick = () => {
    setShowDrawBtn(!showDrawBtn)
    setShowStopBtn(!showStopBtn)

    intervalId.current = setInterval(async () => {
      try {
        const res = await axios.get(
          `http://deckofcardsapi.com/api/deck/${deck_id.current}/draw/?count=1`
        )
        const draw = res.data

        const remainingInDeck = draw['remaining']

        if (remainingInDeck === 0) {
          clearInterval(intervalId.current)
          alert('Deck is empty')
        }

        const position = getPosition()

        const newCard = {...draw.cards[0], zIdx, position }
        setZIdx(zIdx + 1)
        setCards(() => [...cards, newCard])
      } catch (err) {
        console.log(err)
      }
    }, 1000);
  }

  const getPosition = () => {
    let angle = Math.random() * 90 - 45
    let randomX = Math.random() * 40 - 20
    let randomY = Math.random() * 40 - 20

    return `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
  }

  const handleStopClick = () => {
    setShowDrawBtn(!showDrawBtn)
    setShowStopBtn(!showStopBtn)

    clearInterval(intervalId.current)
  }

  return (
    <div>
      {showDrawBtn ? (
        <button onClick={handleDrawClick}>
          Start Drawing!
        </button>
      ) : null}
      {showStopBtn ? (
        <button onClick={handleStopClick}>
          Stop!
        </button>
      ) : null}

      <div>
        {cards.map((card) => (
          <Card
            id={card.code}
            key={card.code}
            cardImg={card.image}
            zIdx={card.zIdx}
            position={card.position}
          />
        ))}
      </div>
    </div>
  )
}

export default CardTable