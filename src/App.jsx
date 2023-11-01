import { useState } from 'react'
import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import { TURNS } from './constants'
import { checkWinner } from './utils/board'

import './App.css'


function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) // null = no hay ganador | false = empate | true = ganador

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }

  const updateBoard = (index) => {
    // No actualizamos la posición si ya tiene valor
    if (board[index] || winner) return

    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
        setWinner(false)
    }

    
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main  className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Resetear juego</button>
        <section className="game">
          {
            board.map((_, index) => (
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            ))
          }
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
