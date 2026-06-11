import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	deletePostfail, deletePostStart, deletePostSucced, getPostfail, getPostStart, getPostSucced
} from '../slices/postSlice'
import PostService from '../services/PostService'
import toast from 'react-hot-toast'
import LoadingOverlay from '../components/loader/LoadingOverlay'
import PostGrid from '../components/post/PostGrid'
import PaginationPanel from '../components/pagination/PaginationPanel'
import { Outlet } from 'react-router-dom'

function Home() {

	const dispatch = useDispatch()

	const { posts = [], isLoading } = useSelector((state) => state.post)
	const { currentPage, perPage } = useSelector((state) => state.paginations)

	// GET POSTS
	const getAllPosts = async () => {
		dispatch(getPostStart())
		try {
			const res = await PostService.getPosts()
			dispatch(getPostSucced(res))
			toast.success("Posts succesfully loaded", {
				style: { color: "#fff", background: "#151f34", zIndex: 10002 }
			})

		} catch (error) {
			dispatch(getPostfail(error?.response?.data))
			toast.error("Error getting posts", {
				style: { color: "#fff", background: "#151f34", zIndex: 10002 }
			})
		}
	}
	useEffect(() => {
		getAllPosts()
	}, [])

	// DELETE POSTS
	const deletePost = async (id) => {
		dispatch(deletePostStart())
		try {
			await PostService.deleteById(id)
			dispatch(deletePostSucced())
			getAllPosts()
			toast.success("Post successfully deleted", {
				style: { color: "#fff", background: "#151f34", zIndex: 10002 }
			})

		} catch (error) {
			dispatch(deletePostfail(error?.response?.data))
			toast.error("Error deleting post", {
				style: { color: "#fff", background: "#151f34", zIndex: 10002 }
			})
		}
	}

	// PAGINATION LOGIK
	const safePosts = posts ?? []

	const totalPages = Math.ceil(safePosts.length / perPage)
	const start = (currentPage - 1) * perPage
	const end = currentPage * perPage
	const slicedPosts = safePosts.slice(start, end)

	const buttonPagination = [1]

	for (let i = Math.max(2, currentPage - 2); i <= Math.min(20, currentPage + 2); i++) {
		buttonPagination.push(i);
	}

	if (totalPages > 1) {
		buttonPagination.push(totalPages)
	}

	console.log(buttonPagination, "buttons");

	const filteredButtonPagination = []

	for (let i = 0; i < buttonPagination.length; i++) {
		filteredButtonPagination.push(buttonPagination[i])

		if (
			i < buttonPagination.length - 1 &&
			buttonPagination[i + 1] - buttonPagination[i] > 1
		) {
			filteredButtonPagination.push("...")
		}
	}
	console.log(filteredButtonPagination);

	return (
		<div>
			{isLoading && <LoadingOverlay />}

			<div className='container py-4'>
				<PostGrid posts={slicedPosts} deletePost={deletePost} />
			</div>

			<PaginationPanel totalPages={totalPages} />
			<Outlet />
		</div>
	)
}

export default Home
