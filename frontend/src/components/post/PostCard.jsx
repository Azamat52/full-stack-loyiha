import { useNavigate } from 'react-router-dom'

function PostCard({ post, deletePost }) {
	console.log(post.picture);

	const navigate = useNavigate()
	return (
		<div className="col-md-6 col-lg-4" >

			<div
				className="card h-100 overflow-hidden border-0"
				style={{
					background: "#0f172a",
					borderRadius: "24px",
					border: "1px solid #1e293b",
					boxShadow: "0 0 25px rgba(0,0,0,0.35)",
					transition: "0.3s ease",
				}}
			>

				<div
					style={{
						width: "100%",
						height: "230px",
						overflow: "hidden",
						borderBottom: "1px solid #1e293b"
					}}
				>
					<div className="image-container">
						<img
							src={`http://localhost:8080/${post.picture}`}
							className="responsive-image"
							alt={post.title}
						/>
					</div>
				</div>

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

					<p
						style={{
							color: "#94a3b8",
							fontSize: "15px",
							lineHeight: "1.7"
						}}
					>
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

						<button
							className="custom-btn edit-btn flex-fill"
							onClick={() => navigate(`/edit/${post.id}`)}
						>
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
	)
}

export default PostCard