import { BoardType } from "../types"

export const updatePosition = (currentBoard: BoardType, fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    // copy the existing board
    const newBoard = [...currentBoard]

    // update the new position the user is moving to and clear the old position
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol]
    newBoard[fromRow][fromCol] = 0

    // take opposing players piece and advance to the area in front
    if (Math.abs(toRow - fromRow) === 2) {
        // remove the piece from the board
        newBoard[(fromRow + toRow) / 2][(fromCol + toCol) / 2] = 0
    }

    // When the last row is reached, King the piece(player)
    if (toRow === 0 && newBoard[toRow][toCol] === 1) {
        newBoard[toRow][toCol] += 2
    }

    // When the last row is reached, King the piece(ai)
    if (toRow === 7 && newBoard[toRow][toCol] === 2) {
        newBoard[toRow][toCol] += 2
    }

    return newBoard
}