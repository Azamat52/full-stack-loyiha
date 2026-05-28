import { useOpenModal } from '../hooks/useOpenModal'

function Modal({ children, sub, body }) {
  const { isOpen, onClose } = useOpenModal()

  return (
    <div
      className={`overlay ${isOpen ? "show" : ""}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`custom-modal ${isOpen ? "open" : ""}`}>

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
            onClick={onClose}
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