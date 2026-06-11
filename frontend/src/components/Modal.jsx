import { useDispatch } from 'react-redux'
import { useOpenModal } from '../hooks/useOpenModal'
import { useEffect } from 'react'
import { clearPostError } from '../slices/postSlice'
import { useNavigate } from 'react-router-dom'

function Modal({ children, sub, body }) {
  const { isOpen, onClose, onOpen } = useOpenModal()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    requestAnimationFrame(() => {
      onOpen()
    })
  }, [])

  const handleClose = () => {
    onClose()
    dispatch(clearPostError())

    setTimeout(() => {
      navigate("/")
    }, 200)
  }
  return (
    <div
      className={`overlay  ${isOpen ? "show" : ""}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className={`custom-modal ${isOpen ? "open" : ""}`}
        style={{
          maxHeight: "100vh",
          overflowY: "auto",

        }}
      >
        {/* Header */}
        <div className="modal-header-custom">

          <div>
            <h2 className="modal-title-custom">
              {sub}
            </h2>

            <p className="modal-body-custom">
              {body}
            </p>
          </div>

          <button
            className="close-btn"
            onClick={handleClose}
          >
            ✕
          </button>

        </div>

        {/* Content */}
        <div className="modal-content-custom">
          {children}
        </div>

      </div>
    </div>
  )
}

export default Modal