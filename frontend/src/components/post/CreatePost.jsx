import { useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import PostService from "../../services/PostService";
import { createPostfail, createPostStart, createPostSucced, getPostSucced } from '../../slices/postSlice';
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import Modal from "../Modal";
import ValidationErrors from '../ValidationErrors';
import { useNavigate } from 'react-router-dom';
import { useOpenModal } from '../../hooks/useOpenModal';

function CreatePost() {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [body, setBody] = useState("")
	const [picture, setPicture] = useState(null)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { onClose } = useOpenModal()
	const { isLoading } = useSelector((state) => state.post)

	const resetForm = () => {
		setTitle("")
		setDescription("")
		setBody("")
		setPicture(null)
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		dispatch(createPostStart())

		const formData = new FormData()
		formData.append("title", title)
		formData.append("body", body)
		formData.append("description", description)
		formData.append("picture", picture)

		try {
			await PostService.create(formData)
			dispatch(createPostSucced())
			const res = await PostService.getPosts()
			dispatch(getPostSucced(res))
			onClose()
			setTimeout(() => {
				navigate(-1)
			}, 200)
			resetForm()
			toast.success("Post successfully created", {
				style: { color: "#fff", background: "#151f34", zIndex: 10002 }
			})
		} catch (error) {
			dispatch(createPostfail(error?.response?.data))
			toast.error("Error deleting post", {
				style: { color: "#fff", background: "#151f34", zIndex: 10002 }
			})
		}
	}


	return (
		<Modal
			sub="Create Post"
			body="Create everything that comes to your mind"
		>
			<ValidationErrors type="post" />

			<form onSubmit={onSubmit}>

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
					setState={setPicture}
					disabled={isLoading}
				/>

				<TextArea
					label="Body"
					value={body}
					setState={setBody}
					disabled={isLoading}
				/>

				<div className="d-flex gap-3 mt-3">

					<button
						type="submit"
						className="btn btn-light w-100"
						disabled={isLoading}
					>
						{isLoading ? "Creating..." : "Create"}
					</button>

					<button
						type="button"
						className="btn btn-outline-light w-100"
						onClick={resetForm}
					>
						Reset
					</button>

				</div>

			</form>
		</Modal>
	)
}

export default CreatePost