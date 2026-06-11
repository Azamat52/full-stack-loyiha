import { useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import PostService from "../../services/PostService";
import { createPostfail, createPostStart, createPostSucced } from '../../slices/postSlice';
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import Modal from "../Modal";
import ValidationErrors from '../ValidationErrors';

function CreatePost() {
	const [title, setTitle] = useState("dew")
	const [description, setDescription] = useState("wewef")
	const [body, setBody] = useState("fewfw")
	const [picture, setPicture] = useState(null)

	const dispatch = useDispatch()
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
					onChange={(e) => setTitle(e.target.value)}
				/>

				<Input
					label="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<Input
					label="Picture"
					type="file"
					onChange={(e) => setPicture(e.target.files[0])}
				/>

				<TextArea
					label="Body"
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>

				<div className="d-flex gap-3 mt-3">

					<button
						type="submit"
						className="btn btn-light w-100"
						disabled={isLoading}
					>
						{isLoading ? "Creating" : "Create..."}
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