import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import PostService from '../services/PostService'
import { createPostfail, createPostStart, createPostSucced, getPostfail, getPostStart, getPostSucced } from '../slices/postSlice'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import { useOpenModal } from '../hooks/useOpenModal'

function Home() {
	const { loggedIn } = useSelector((state) => state.auth)
	const { posts } = useSelector((state) => state.post)
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [body, setBody] = useState("")
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { onClose } = useOpenModal()

	const getAllPost = async () => {
		dispatch(getPostStart())
		try {
			const res = await PostService.getPosts()
			dispatch(getPostSucced(res))
		} catch (error) {
			dispatch(getPostfail(error.response?.data))
		}
	}

	const Reset = () => { setTitle(""); setBody(""); setDescription("") }
	const handleSubmit = async (e) => {
		e.preventDefault()
		dispatch(createPostStart())
		const newPost = { title, description, body }
		try {
			await PostService.create(newPost)
			dispatch(createPostSucced())
			Reset()
			onClose()
			getAllPost()
		} catch (error) {
			dispatch(createPostfail(error.response?.data))
		}
	}
	useEffect(() => {
		getAllPost()
	}, [])
	useEffect(() => {
		if (!loggedIn) {
			navigate("/auth")
		}
	}, [loggedIn])
	return (
		<div
			className='w-100 vh-100'
			style={{ background: '#020617' }}
		>
			<div className='container py-4'>

				<div className='row g-4'>

					{posts !== null ? (
						posts.map((post) => {
							return (
								<div
									className="col-md-6 col-lg-4"
									key={post.id}
								>

									<div
										className="card h-100 overflow-hidden border-0"
										style={{
											background: "#0f172a",
											borderRadius: "24px",
											border: "1px solid #1e293b",
											boxShadow: "0 0 25px rgba(0,0,0,0.35)",
											transition: "0.3s ease"
										}}
									>

										{/* IMAGE */}
										<div
											style={{
												width: "100%",
												height: "230px",
												overflow: "hidden",
												borderBottom: "1px solid #1e293b"
											}}
										>
											<img
												src={post.picture}
												alt={post.title}
												style={{
													width: "100%",
													height: "100%",
													objectFit: "cover"
												}}
											/>
										</div>

										{/* BODY */}
										<div className="card-body d-flex flex-column">

											{/* USER */}
											<div className="mb-3">
												<span
													className="px-3 py-2 rounded-pill"
													style={{
														background: "rgba(255,255,255,0.05)",
														border: "1px solid #334155",
														color: "white",
														fontSize: "13px"
													}}
												>
													@{post.author.username}
												</span>
											</div>

											{/* TITLE */}
											<h2
												className="text-white fw-bold mb-3"
												style={{
													fontSize: "28px",
													wordBreak: "break-word"
												}}
											>
												{post.title}
											</h2>

											{/* DESCRIPTION */}
											<p
												style={{
													color: "#94a3b8",
													fontSize: "15px",
													lineHeight: "1.7"
												}}
											>
												{post.description}
											</p>

											{/* BODY */}
											<div
												className="mt-2 flex-grow-1"
												style={{
													color: "#e2e8f0",
													fontSize: "14px",
													lineHeight: "1.8",
													wordBreak: "break-word"
												}}
											>
												{post.body}
											</div>

										</div>

										{/* FOOTER */}
										<div className="card-footer border-0 bg-transparent">

											<div className="mb-3">

												<small
													style={{
														color: "#64748b",
														fontSize: "13px"
													}}
												>
													{new Date(post.createdAt).toLocaleDateString()}
												</small>

											</div>

											<div className="d-flex gap-2 flex-wrap">

												<button className="custom-btn view-btn flex-fill">
													View
												</button>

												<button className="custom-btn edit-btn flex-fill">
													Edit
												</button>

												<button className="custom-btn delete-btn flex-fill">
													Delete
												</button>

											</div>

										</div>

									</div>

								</div>
							)
						})
					) : (
						<div className='text-white'>
							There is no post available
						</div>
					)}

				</div>

			</div>
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

export default Home