import React from 'react'
import PostCard from './PostCard'

function PostGrid({ posts, deletePost }) {
	return (
		<div className='row g-4'>
			{posts !== [] ? (
				posts.map((post) => (
					<PostCard key={post.id} post={post} deletePost={deletePost} />
				))
			) : (
				<div
					className="mx-auto text-center py-5 px-4"
					style={{
						maxWidth: "500px",
						background: "#0f172a",
						border: "1px solid #1e293b",
						borderRadius: "24px",
						color: "#94a3b8",
						fontSize: "22px",
						boxShadow: "0 0 25px rgba(0,0,0,0.35)"
					}}
				>
					📭 There are no posts available
				</div>
			)}
		</div>
	)
}

export default PostGrid
