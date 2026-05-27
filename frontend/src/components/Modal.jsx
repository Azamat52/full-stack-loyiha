import { useOpenModal } from '../hooks/useOpenModal'

function Modal({ children }) {
  const { isOpen, onClose } = useOpenModal()

  return (
    <div
      className={isOpen ? "overlay" : ""}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`custom-modal ${isOpen ? "open" : ""}`}>
        
        <div className="d-flex justify-content-end">
          <button onClick={onClose}>X</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal