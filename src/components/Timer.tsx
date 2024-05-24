import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../state/store"
import { incrementTime } from "../state/gameStats/timeCounter"

const Timer = () => {
  const dispatch = useDispatch()
  const time = useSelector((state: RootState) => state.timeCounterReducer)

  useEffect(() => {
    const count = setInterval(() => {
      dispatch(incrementTime())
    }, 1000)

    return () => {
      clearInterval(count)
    }
  })

  return <div>Elapsed Time: {time.time}</div>
}

export default Timer
