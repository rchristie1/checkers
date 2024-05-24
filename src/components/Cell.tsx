import { PieceType, Move } from "../types"
import { useDrop } from "react-dnd"
import Piece from "./Piece"
import "./Cell.scss"

type CellProps = {
  col: number
  row: number
  piece: PieceType
  handleDrop: (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ) => void
  possibleUserMoves: Move[]
}

type ClassActionTyes = 'add' | 'remove'

const Cell = ({
  row,
  col,
  piece,
  handleDrop,
  possibleUserMoves,
}: CellProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: "piece",
    drop: (item: { row: number; col: number }) =>
      handleDrop(item.row, item.col, row, col),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const cellIsOddNumber = (row + col) % 2

  const getElementDetails = (action: ClassActionTyes) => {
    if (piece === 1) {
        // find the cells that the hovered piece can move to
        const highlightCells = possibleUserMoves.filter((move) => {
          if (move.from[0] === row && move.from[1] === col) {
            return move
          }
          return undefined
        })
  
        // apply classes to each of those cells while it's being hovered
        highlightCells.map((cell) => {
          const el = document.getElementById(`r${cell.to[0]}c${cell.to[1]}`)
            el?.classList[action]("player-assist")

            setTimeout(() => {
                el?.classList.remove("player-assist")
            }, 3500);
          return el
        })
    }
  }

  const showAvailableMoves = () => {
    getElementDetails('add');
  }

  const clearAvailableMoves = () => {
    getElementDetails('remove');
  }

  // Dynamically add/remove classes
  const classes = ["cell"]
  isOver && classes.push("hovered")
  cellIsOddNumber && classes.push("dark")
  piece === 1 || piece === 3 ? classes.push("player") : classes.push("ai")

  return (
    <div
      onMouseOver={() => showAvailableMoves()}
      onMouseLeave={() => clearAvailableMoves()}
      onMouseOut={() => clearAvailableMoves()}
      onMouseDown={() => clearAvailableMoves()}
      ref={drop}
      className={classes.join(" ")}
      id={`r${row}c${col}`}
    >
      {piece !== 0 && (
        <Piece
          row={row}
          col={col}
          piece={piece}
          possibleUserMoves={possibleUserMoves}
        />
      )}
    </div>
  )
}

export default Cell
