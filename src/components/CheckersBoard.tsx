import { useState, useEffect } from "react"
import { GameState, Move, PlayerType } from "../types"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { initialBoard } from "../states"
import { updatePosition } from "../helpers/functions"
import Cell from "./Cell"
import "./CheckersBoard.scss"

const CheckersBoard = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: structuredClone(initialBoard), // the new way of doing JSON.parse(JSON.stringify(x)) for deep clone
    turn: "player",
    status: "active",
  })
  const [pieceCount, setPieceCount] = useState({
    user: 0,
    ai: 0,
  })

  const [possibleUserMoves, setPossibleUserMoves] = useState<Move[]>([])

  useEffect(() => {
    let aiPieceCount = 0
    let userPieceCount = 0

    for (let row = 0; row < gameState.board.length; row++) {
      for (let col = 0; col < gameState.board[row].length; col++) {
        const currentPiece = gameState.board[row][col]

        // check for user pieces
        if ([1, 3].includes(currentPiece)) {
          userPieceCount++
        }

        // check for ai pieces
        if ([2, 4].includes(currentPiece)) {
          aiPieceCount += 1
        }
      }
    }

    // TODO: Revisit this because it's probably unecessary to store in a state
    setPieceCount((prevState) => ({
      ...prevState,
      ai: aiPieceCount,
      user: userPieceCount,
    }))

    if (
      pieceCount.ai === 0 &&
      pieceCount.user !== 0 &&
      gameState.status !== "ended"
    ) {
      return console.log("user wins")
    }
    if (
      pieceCount.user === 0 &&
      pieceCount.ai !== 0 &&
      gameState.status !== "ended"
    ) {
      return console.log("ai wins")
    }

    // When the turn variable changes trigger the AI move
    if (gameState.turn === "AI") {
      setTimeout(() => {
        makeAIMove()

        // Checks possible moves after AI moves
        // const moves = getPossibleMoves("player")
        // setPossibleUserMoves(moves)
      }, 500)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.turn])

  useEffect(() => {
    if (gameState.board.length) {
      console.log(gameState.board);
      
      console.log("inside the possible user moves effect hook")
      getPossibleMoves('player')

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.board])

  const isValidMove = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ): boolean => {
    const piece = gameState.board[fromRow][fromCol]

    // if the move is outside the bounds of the grid then it's invalid
    if (toRow > 7 || toRow < 0 || toCol > 7 || toCol < 0) {
      return false
    }

    if (gameState?.board[toRow][toCol] === undefined) return false

    // If the selected spot doesnt have a piece or you're
    // trying to place it is on another piece then return false
    if (piece === 0 || gameState?.board[toRow][toCol] !== 0) return false

    const rowMove = toRow - fromRow
    const colMove = toCol - fromCol

    // user moves
    if (piece === 1) {
      // regular pieces should not go down and left or down and right
      if ((rowMove === 1 && colMove < 1) || (rowMove === 1 && colMove === 1))
        return false
    }

    // ai moves
    if (piece === 2) {
      // regular pieces should not go up and left or up and right
      if ((rowMove < 1 && colMove < 1) || (rowMove < 0 && colMove === 1))
        return false
    }

    if (Math.abs(toRow - fromRow) === 1 && Math.abs(toCol - fromCol) === 1)
      return true

    // if a piece is being taken it will need to jump 2 spaces in either direction
    if (Math.abs(toRow - fromRow) === 2 && Math.abs(toCol - fromCol) === 2) {
      const middlePiece =
        gameState.board[(fromRow + toRow) / 2][(fromCol + toCol) / 2]

      const aiPieces = [2, 4]
      const userPieces = [1, 3]

      if (
        (piece === 1 && aiPieces.includes(middlePiece)) ||
        (piece === 2 && userPieces.includes(middlePiece)) ||
        (piece === 3 && aiPieces.includes(middlePiece)) ||
        (piece === 4 && userPieces.includes(middlePiece))
      )
        return true
    }

    return false
  }

  const handleDrop = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ) => {
    // TODO: Revist this
    // The following function is used as a fallback when no takeable units are found.
    // setting this as the default at the bottom of the handleDrop causes it to override
    // the logic for forcing the user to jump units so instead it's called else conditions
    const makeDefaultMove = () => {
      if (isValidMove(fromRow, fromCol, toRow, toCol)) {
        const newBoard = updatePosition(
          gameState.board,
          fromRow,
          fromCol,
          toRow,
          toCol
        )

        setGameState({ board: newBoard, turn: "AI" })
      }
    }

    if (possibleUserMoves.length) {
      // look for moves that can take enemy pieces
      const takeableMoves = possibleUserMoves.filter(
        (move) => Math.abs(move.from[0] - move.to[0]) === 2
      )

      // Check if takeable moves exist
      if (takeableMoves.length) {
        // if the attempted move is one of the takeable moves then proceed with it
        const moveIsValid = takeableMoves.find((m) => {
          if (
            m.from[0] === fromRow &&
            m.from[1] === fromCol &&
            m.to[0] === toRow &&
            m.to[1] === toCol
          ) {
            return m
          }

          return undefined
        })

        if (moveIsValid) {
          // assigned for clarity on what each value represents
          const oldRow = moveIsValid?.from[0]
          const newRow = moveIsValid?.to[0]
          const oldCol = moveIsValid?.from[1]
          const newCol = moveIsValid?.to[1]

          const newBoard = updatePosition(
            gameState.board,
            oldRow,
            oldCol,
            newRow,
            newCol
          )

          setGameState({ board: newBoard, turn: "AI" })
        }
      } else {
        makeDefaultMove()
      }
    } else {
      makeDefaultMove()
    }
  }

  const makeAIMove = () => {
    let moves = getPossibleMoves("AI")
    if (moves.length > 0) {
      // Choose a random move from the available moves
      const move = moves[Math.floor(Math.random() * moves.length)]

      const newBoard = updatePosition(
        gameState.board,
        move.from[0],
        move.from[1],
        move.to[0],
        move.to[1]
      )

      setGameState({ board: newBoard, turn: "player" })
    } else {
      setGameState({ ...gameState, turn: "player" })
    }
  }

  const getPossibleMoves = (player: PlayerType): Move[] => {
    const moves: Move[] = []
    const standardPiece = player === "player" ? 1 : 2
    const king = player === "player" ? 3 : 4

    for (let row = 0; row < gameState.board.length; row++) {
      for (let col = 0; col < gameState.board[row].length; col++) {
        const possibleMoves: Move[] = []
        if (gameState.board[row][col] === standardPiece) {
          const direction =
            gameState.board[row][col] === standardPiece
              ? standardPiece === 1
                ? -1
                : 1
              : 0

          // Possible moves for regular pieces
          possibleMoves.push(
            { from: [row, col], to: [row + direction, col - 1] },
            { from: [row, col], to: [row + direction, col + 1] },
            { from: [row, col], to: [row + 2 * direction, col - 2] },
            { from: [row, col], to: [row + 2 * direction, col + 2] }
          )
        }

        // Possible moves for Kings
        if (gameState.board[row][col] === king) {
          possibleMoves.push(
            { from: [row, col], to: [row + 1, col - 1] },
            { from: [row, col], to: [row + 1, col + 1] },
            { from: [row, col], to: [row + 2, col - 2] },
            { from: [row, col], to: [row + 2, col + 2] },
            { from: [row, col], to: [row - 1, col + 1] },
            { from: [row, col], to: [row - 1, col - 1] },
            { from: [row, col], to: [row - 2, col + 2] },
            { from: [row, col], to: [row - 2, col - 2] }
          )
        }

        possibleMoves.forEach((move) => {
          if (isValidMove(move.from[0], move.from[1], move.to[0], move.to[1])) {
            moves.push(move)
          }
        })
      }
    }

    // If there are no more moves end the game and display a winner
    if (!moves.length) {
      if (player === "AI") {
        // user wins
        console.log("user wins")
      } else {
        // player wins
        console.log("ai wins")
      }

      setGameState({ ...gameState, status: "ended" })
    }

    // Search the possible moves for overtaking opportunities.
    // If found, only return those options as valid moves
    let takeableMoves: Move[] = []

    if (moves.length > 2) {
      takeableMoves = moves.filter(
        (move) => Math.abs(move.from[0] - move.to[0]) === 2
      )
    }

    if (takeableMoves.length) {
      if(player === 'player') {
        setPossibleUserMoves(takeableMoves)
      }
      return takeableMoves
    } else {
      if(player === 'player') {
        setPossibleUserMoves(moves)
      }
      return moves
    }
  }

  const resetGame = () => {
    setGameState({ board: initialBoard, status: "active", turn: "player" })

    console.log(initialBoard);
    
    console.log(gameState.board);
    
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="checkers-board">
        {gameState.board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <Cell
                key={`r${rowIndex}c${colIndex}`}
                row={rowIndex}
                col={colIndex}
                piece={cell}
                handleDrop={handleDrop}
                possibleUserMoves={possibleUserMoves}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={() => resetGame()}>Reset</button>
    </DndProvider>
  )
}

export default CheckersBoard
