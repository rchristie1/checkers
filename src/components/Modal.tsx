import "./Modal.scss"

type WinnerType = {
  player: string
}

const Modal = ({ player }: WinnerType) => {
  return (
    <div className="modal">
      <div className="background" />
      <div className="banner">{player} wins</div>
    </div>
  )
}

export default Modal
