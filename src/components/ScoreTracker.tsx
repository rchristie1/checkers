import { useSelector } from "react-redux"
import { RootState } from "../state/store"
import "./ScoreTracker.scss"

const ScoreTracker = () => {
  const winCount = useSelector((state: RootState) => state.winCounterReducer)

  return (
    <div className="score-container">
      <div>AI Wins: {winCount.ai}</div>
      <div>User Wins: {winCount.user}</div>
    </div>
  )
}

export default ScoreTracker
