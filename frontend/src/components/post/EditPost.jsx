import { useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import PostService from "../../services/PostService";
import { createPostfail, createPostStart, createPostSucced, editPostfail, editPostStart, editPostSucced } from '../../slices/postSlice';
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import Modal from "../Modal";
import { useParams } from 'react-router-dom';
import ValidationErrors from '../ValidationErrors';

function EditPost() {
	const [title, setTitle] = useState("ewfw")
	const [description, setDescription] = useState("fewfw")
	const [body, setBody] = useState("ffwe")
	const [picture, setPicture] = useState(null)

	const { isLoading } = useSelector((state) => state.post)
	const dispatch = useDispatch()
	const { id } = useParams()

	const resetForm = () => {
		setTitle("")
		setDescription("")
		setBody("")
		setPicture(null)
	}

	const onEditSubmit = async (e) => {
		e.preventDefault()
		dispatch(editPostStart())

		const formData = new FormData()
		formData.append("title", title)
		formData.append("body", body)
		formData.append("description", description)
		formData.append("picture", picture)

		try {
			await PostService.editById(formData, id)
			dispatch(editPostSucced())
			resetForm()
			toast.success("Post successfully edited", {
				style: { color: "#fff", background: "#151f34", zIndex: 10002 }
			})
		} catch (error) {
			dispatch(editPostfail(error?.response?.data))
			toast.error("Error editing post", {
				style: { color: "#fff", background: "#151f34", zIndex: 10002 }
			})
		}
	}


	return (
		<Modal
			sub="Edit Post"
			body="Edit your post if you want"
		>	
			<ValidationErrors type="post"/>
			<form onSubmit={onEditSubmit}>

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
						{isLoading ? "Editing..." : "Edit"}
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

export default EditPost