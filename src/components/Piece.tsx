import { PieceType } from "../types"
import { useDrag } from "react-dnd"
import "./Piece.scss"

type PieceProps = {
  col: number
  row: number
  piece: PieceType
}

const Piece = ({ row, col, piece }: PieceProps) => {
  const [{ isDragging }, ref] = useDrag({
    type: "piece",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: { row, col, piece },
  }) 

  return (
    <div
      ref={ref}
      className={`piece ${
        piece === 1
          ? "player"
          : piece === 2
          ? "ai"
          : piece === 3
          ? "player-king"
          : "ai-king"
      } ${isDragging && "grabbed"}`}
    >
      {piece === 3 && "K"}
      {piece === 4 && "K"}
    </div>
  )
}

export default Piece
