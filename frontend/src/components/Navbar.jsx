import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import Modal from './Modal'
import { useOpenModal } from '../hooks/useOpenModal'
import Input from '../ui/Input'
import { createPostfail, createPostStart } from "../slices/PostSlice"
import PostService from "../services/PostService"
import TextArea from '../ui/TextArea';

function Navbar() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [body, setBody] = useState("")
  const { onOpen } = useOpenModal()
  const dispatch = useDispatch()

  const Reset = () => { setTitle(""); setBody(""); setDescription(""); setBody(""); }
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(createPostStart())
    const newPost = { title, description, body }
    console.log(newPost);
    try {
      const data = await PostService.create(newPost)
      console.log(data);
    } catch (error) {
      dispatch(createPostfail(error.response?.data))
    }
  }

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
      <Modal sub="Create Post" body="Create everything which come to your mind">
        <form onSubmit={handleSubmit}>
          <Input label="Title" id="title" value={title} placeholder="Title" setState={setTitle} />
          <Input label="Description" id="description" value={description} placeholder="Description" setState={setDescription} />
          <TextArea label="Body" id="body" value={body} setState={setBody} />
          <div className='d-flex gap-3 w-100'>
            <button className="btn btn-light w-100 px-4 py-2 rounded-pill fw-semibold">
              Create
            </button>
            <button
              className="btn text-white w-100 px-4 py-2 rounded-pill fw-semibold"
              onClick={Reset}
              style={{
                backgroundColor: "#020617",
                border: "1px solid #1e293b",
              }}> 
              Reset
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Navbar