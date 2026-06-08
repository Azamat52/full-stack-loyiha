import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import PostService from '../services/PostService'
import {
	clearPostError,
	createPostfail,
	createPostStart,
	createPostSucced,
	deletePostfail,
	deletePostStart,
	deletePostSucced,
	getPostfail,
	getPostStart,
	getPostSucced
} from '../slices/postSlice'

import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import { useOpenModal } from '../hooks/useOpenModal'
import { RotatingLines } from "react-loader-spinner"
import ValidationErrors from '../components/ValidationErrors'
import toast from 'react-hot-toast'
import { nextPage, prevPage, setCurrentPage, setPerPage } from '../slices/paginationSlice'

function Home() {

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { onClose } = useOpenModal()

	const { loggedIn } = useSelector((state) => state.auth)
	const { posts = [], isLoading } = useSelector((state) => state.post)
	const { perPage, currentPage } = useSelector((state) => state.paginations)

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [body, setBody] = useState("")
	const [picture, setPicture] = useState("")

	// ---------------- GET POSTS ----------------
	const getAllPost = async () => {
		dispatch(getPostStart())

		try {
			const res = await PostService.getPosts()
			dispatch(getPostSucced(res))

			toast.success("Posts successfully loaded", {
				style: { color: "#fff", background: "#020617" }
			})
		} catch (error) {
			dispatch(getPostfail(error?.response?.data))

			toast.error("Error loading posts", {
				style: { color: "#fff", background: "#030921" }
			})
		}
	}

	useEffect(() => {
		getAllPost()
	}, [])

	useEffect(() => {
		if (!loggedIn) navigate("/auth")
	}, [loggedIn])

	// ---------------- CREATE ----------------
	const handleSubmit = async (e) => {
		e.preventDefault()
		dispatch(createPostStart())

		const formData = await new FormData()
		formData.append("picture", picture)
		const newPost = {title, description, body, formData}
		console.log(newPost);
		
		try {
			await PostService.create(newPost)

			dispatch(createPostSucced())
			setTitle("")
			setDescription("")
			setBody("")
			setPicture("")
			onClose()
			dispatch(clearPostError())
			getAllPost()

			toast.success("Post successfully created", {
				style: { color: "#fff", background: "#020617" }
			})
		} catch (error) {
			dispatch(createPostfail(error?.response?.data))

			toast.error("Error creating post", {
				style: { color: "#fff", background: "#030921" }
			})
		}
	}

	// ---------------- DELETE ----------------
	const deletePost = async (id) => {
		dispatch(deletePostStart())

		try {
			await PostService.deleteById(id)

			dispatch(deletePostSucced())
			getAllPost()

			toast.success("Post successfully deleted", {
				style: { color: "#fff", background: "#020617" }
			})
		} catch (error) {
			dispatch(deletePostfail(error?.response?.data))

			toast.error("Error deleting post", {
				style: { color: "#fff", background: "#030921" }
			})
		}
	}

	// ---------------- PAGINATION FIX ----------------
	const safePosts = posts ?? []

	const limit = Number(perPage || 10)
	const page = Number(currentPage || 1)

	const totalPages = Math.ceil(safePosts.length / limit)

	const start = (page - 1) * limit
	const end = page * limit

	const slicedPosts = safePosts.slice(start, end)

	const buttonPages = [1]
	for (let i = Math.max(2, page - 2); i <= Math.min(totalPages - 1, page + 2); i++) {
		buttonPages.push(i)
	}
	if (totalPages > 1) {
		buttonPages.push(totalPages)
	}
	const paginations = []
	for (let i = 0; i < buttonPages.length; i++) {
		paginations.push(buttonPages[i])

		if (
			i < buttonPages.length - 1 &&
			buttonPages[i + 1] - buttonPages[i] > 1
		) {
			paginations.push("...")
		}
	}
	return (
		<div
			className='w-100'
			style={{
				minHeight: "100vh",
				background: "#020617",
				flexDirection: "column"
			}}
		>
			<div className='container py-4'>

				{/* LOADING OVERLAY (UNCHANGED STYLE) */}
				<div
					className='position-fixed top-0 start-0 w-100 vh-100 justify-content-center align-items-center bg-black bg-opacity-50'
					style={{
						zIndex: 9999,
						display: isLoading ? "flex" : "none"
					}}
				>
					{isLoading && <RotatingLines color='#505050' height="50" width="50" />}
				</div>
				{/* Pagination panel */}
				<div className='row g-4'>
					{/* POSTS */}
					{slicedPosts.length > 0 ? (
						slicedPosts.map((post) => (
							<div className="col-md-6 col-lg-4" key={post.id}>

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

									{/* IMAGE (UNCHANGED) */}
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

									{/* BODY (UNCHANGED STYLE) */}
									<div className="card-body d-flex flex-column">

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
												@{post?.author?.username}
											</span>
										</div>

										<h2
											className="text-white fw-bold mb-3"
											style={{
												fontSize: "28px",
												wordBreak: "break-word"
											}}
										>
											{post.title}
										</h2>

										<p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.7" }}>
											{post.description}
										</p>

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

									{/* FOOTER (UNCHANGED STYLE) */}
									<div className="card-footer border-0 bg-transparent">

										<div className="mb-3">
											<small style={{ color: "#64748b", fontSize: "13px" }}>
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

											<button
												className="custom-btn delete-btn flex-fill"
												onClick={() => deletePost(post.id)}
											>
												Delete
											</button>

										</div>

									</div>

								</div>

							</div>
						))
					) : (
						<div className='text-gray fs-1 text-center py-5'>
							There is no post available
						</div>
					)}

				</div>
			</div>
			{/* Pagination panel */}
			{totalPages > 1 && (
				<div className="pagination-container">

					{/* Prev */}
					<button
						className="pagination-btn nav-btn"
						onClick={() => page > 1 && dispatch(prevPage())}
						style={{ cursor: page === 1 ? "not-allowed" : "pointer" }}
					>
						Prev
					</button>

					{/* Pages */}
					{paginations.map((page, index) =>
						page === "..." ? (
							<span key={index} className="pagination-dots">
								...
							</span>
						) : (
							<button
								key={index}
								onClick={() => dispatch(setCurrentPage(page))}
								className={`pagination-btn ${page === currentPage ? "active_button" : ""}`}
							>
								{page}
							</button>
						)
					)}

					{/* Next */}
					<button
						className="pagination-btn nav-btn"
						onClick={() => page < totalPages && dispatch(nextPage())}
						style={{ cursor: page === totalPages ? "not-allowed" : "pointer" }}
					>
						Next
					</button>

					{/* SEPARATOR */}
					<div className="pagination-divider"></div>

					{/* SELECT */}
					<select className="pagination-select" onChange={e => dispatch(setPerPage(e.target.value))}>
						<option value="10">10 / page</option>
						<option value="20">20 / page</option>
						<option value="30">30 / page</option>
						<option value="50">50 / page</option>
						<option value="100">100 / page</option>
					</select>

				</div>)}
			{/* MODAL (UNCHANGED) */}
			<Modal sub="Create Post" body="Create everything which come to your mind">
				<ValidationErrors type="post" />

				<form onSubmit={handleSubmit}>

					<Input
						label="Title"
						value={title}
						setState={setTitle}
						disabled={isLoading}
					/>

					<Input
						label="Description"
						value={description}
						setState={setDescription}
						disabled={isLoading}
					/>

					<Input
						label="Picture"
						type="file"
						value={picture}
						setState={setPicture}
						disabled={isLoading}
					/>

					<TextArea
						label="Body"
						value={body}
						setState={setBody}
						disabled={isLoading}
					/>

					<div className='d-flex gap-3 w-100 mt-3'>

						<button
							className="btn btn-light w-100 px-4 py-2 rounded-pill fw-semibold"
							disabled={isLoading}
						>
							{isLoading ? "Creating..." : "Create"}
						</button>

						<button
							type="button"
							className="btn text-white w-100 px-4 py-2 rounded-pill fw-semibold"
							onClick={() => {
								setTitle("")
								setDescription("")
								setBody("")
							}}
							style={{
								backgroundColor: "#020617",
								border: "1px solid #1e293b",
							}}
						>
							Reset
						</button>

					</div>

				</form>
			</Modal>
		</div>
	)
}

export default Home