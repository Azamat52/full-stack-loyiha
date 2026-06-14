import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getPostDetailfail, getPostDetailStart, getPostDetailSucced } from '../../slices/postSlice'
import PostService from '../../services/PostService'
import LoadingOverlay from '../loader/LoadingOverlay'

function PostDetail() {

	const { postDetail, isLoading } = useSelector((state) => state.post)
	const { loggedIn } = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()

	const getPostById = async () => {
		dispatch(getPostDetailStart())
		try {
			const res = await PostService.getById(id)
			dispatch(getPostDetailSucced(res))
		} catch (error) {
			dispatch(getPostDetailfail(error?.response?.data))
		}
	}

	useEffect(() => {
		if (!loggedIn) {
			navigate("/auth")
		}
	}, [loggedIn])
	useEffect(() => {
		getPostById()
	}, [])
	return (
		<div
			className="container py-5 fade-page text-white"
			style={{ minHeight: "100vh" }}
		>
			{isLoading && <LoadingOverlay />}
			{postDetail && (
				<div className="mx-auto" style={{ maxWidth: "1000px" }}>

					{/* BACK BUTTON */}
					<button
						className="custom-btn edit-btn mb-4 slide-top"
						onClick={() => navigate(-1)}
					>
						<i className="fa-solid fa-arrow-left me-2"></i>
						Go Back
					</button>

					{/* IMAGE */}
					<div
						className="overflow-hidden mb-4 slide-top"
						style={{
							borderRadius: "24px",
							border: "1px solid #1e293b",
							height: "450px"
						}}
					>
						<div className="image-container">
							<img
								src={`http://localhost:8080/${postDetail.picture}`}
								className="responsive-image"
								alt={postDetail.title}
							/>
						</div>
					</div>

					{/* TITLE */}
					<h1
						className="fw-bold mb-3 slide-top"
						style={{
							fontSize: "56px",
							color: "white"
						}}
					>
						{postDetail.title}
					</h1>

					{/* DESCRIPTION */}
					<p
						className="slide-top"
						style={{
							color: "#94a3b8",
							fontSize: "20px",
							lineHeight: "1.8"
						}}
					>
						{postDetail.description}
					</p>

					{/* AUTHOR */}
					<div
						className="mt-5 mb-5"
						style={{
							background: "#0f172a",
							border: "1px solid #1e293b",
							borderRadius: "24px",
							padding: "24px"
						}}
					>

						<div className="d-flex justify-content-between align-items-center flex-wrap gap-4">

							<div className="d-flex align-items-center gap-3">

								<div
									className="d-flex justify-content-center align-items-center"
									style={{
										width: "70px",
										height: "70px",
										borderRadius: "50%",
										background: "#1e293b",
										color: "white",
										fontSize: "28px",
										fontWeight: "bold"
									}}
								>
									{postDetail.author.username[0].toUpperCase()}
								</div>

								<div>
									<h4 className="mb-1 text-white">
										{postDetail.author.username}
									</h4>

									<p
										className="m-0"
										style={{ color: "#94a3b8" }}
									>
										Author
									</p>
								</div>

							</div>

							<div>

								<p
									className="m-0"
									style={{ color: "#94a3b8" }}
								>
									Created:
									{" "}
									{new Date(postDetail.createdAt).toLocaleDateString()}
								</p>

								<p
									className="m-0 mt-2"
									style={{ color: "#94a3b8" }}
								>
									Updated:
									{" "}
									{new Date(postDetail.updatedAt).toLocaleDateString()}
								</p>

							</div>

						</div>

					</div>

					{/* BODY */}
					<div
						style={{
							background: "#0f172a",
							border: "1px solid #1e293b",
							borderRadius: "24px",
							padding: "40px",
							color: "#e2e8f0",
							fontSize: "18px",
							lineHeight: "2",
							whiteSpace: "pre-line"
						}}
					>
						{postDetail.body}
					</div>

				</div>
			)}
		</div>
	)
}

export default PostDetail
