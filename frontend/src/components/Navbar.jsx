import React, { useState } from "react"
import { Link } from 'react-router-dom'
import Modal from './Modal'
import { useOpenModal } from '../hooks/useOpenModal'

function Navbar() {
  const { onOpen } = useOpenModal()

  return (
    <div style={{ backgroundColor: "#0f172a" }}>
      <nav  
        className="navbar container navbar-expand-lg py-3"
      >
        <div className="container-fluid">

          {/* Logo */}
          <Link
            to="/"
            className="navbar-brand text-white fw-bold fs-2 d-flex align-items-center gap-2"
          >
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: "45px",
                height: "45px",
                background: "#7c3aed",
              }}
            >
              <span className="text-white fw-bold">S</span>
            </div>

            Sammi
          </Link>

          {/* Buttons */}
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn text-white px-4 py-2 rounded-pill fw-semibold"
              style={{
                backgroundColor: "#020617",
                border: "1px solid #1e293b",
              }}
              onClick={onOpen}
            >
              Create Post
            </button>

            <Link to="/auth">
              <button className="btn btn-light px-4 py-2 rounded-pill fw-semibold">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <Modal>
        <h2>Salom</h2>
      </Modal>
    </div>
  )
}

export default Navbar