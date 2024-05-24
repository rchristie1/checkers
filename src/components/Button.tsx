import "./Button.scss"

type ButtonType = {
  resetGame: () => void
}

const Button = ({ resetGame }: ButtonType) => {
  return (
    <button className="reset-button" onClick={resetGame}>
      New Game
    </button>
  )
}

export default Button
