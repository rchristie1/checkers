import { useSelector } from "react-redux"
import { RootState } from "../state/store"

const ScoreTracker = () => {
  const winCount = useSelector((state: RootState) => state.winCounterReducer)

  return (
    <div>
      <div>User Wins: {winCount.user}</div>
      <div>AI Wins: {winCount.ai}</div>
    </div>
  )
}

export default ScoreTracker
