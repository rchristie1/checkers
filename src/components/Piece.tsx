import { PieceType, Move } from "../types"
import { useDrag } from "react-dnd"
import "./Piece.scss"

type PieceProps = {
  col: number
  row: number
  piece: PieceType
  possibleUserMoves: Move[]
}

const Piece = ({ row, col, piece, possibleUserMoves }: PieceProps) => {
  const [{ isDragging }, ref] = useDrag({
    type: "piece",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: { row, col, piece },
  })

  const showPieceDetails = () => {
    if(piece === 1) {
        // console.log(`row: ${row} col: ${col}`);
        // console.log(possibleUserMoves);
    }
    
  }  

  return (
    <div
    onMouseOver={() => showPieceDetails()}
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
