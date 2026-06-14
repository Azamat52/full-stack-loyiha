import { useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import PostService from "../../services/PostService";
import { createPostfail, createPostStart, createPostSucced, editPostfail, editPostStart, editPostSucced, getPostSucced } from '../../slices/postSlice';
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import Modal from "../Modal";
import { useNavigate, useParams } from 'react-router-dom';
import ValidationErrors from '../ValidationErrors';
import { useOpenModal } from '../../hooks/useOpenModal';

function EditPost() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [body, setBody] = useState("");
	const [picture, setPicture] = useState(null);

	const { isLoading } = useSelector((state) => state.post);
	const { onClose } = useOpenModal();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const resetForm = () => {
		setTitle("");
		setDescription("");
		setBody("");
		setPicture(null);
	};

	const onEditSubmit = async (e) => {
		e.preventDefault();
		dispatch(editPostStart());

		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("body", body);
		formData.append("picture", picture);

		try {
			await PostService.editById(id, formData);
			dispatch(editPostSucced());
			const res = await PostService.getPosts();
			dispatch(getPostSucced(res));
			onClose();
			setTimeout(() => {
				navigate("/");
			}, 200);
			resetForm();
			toast.success("Post successfully edited", {
				style: { color: "#fff", background: "#151f34", zIndex: 10002 }
			});
		} catch (error) {
			dispatch(editPostfail(error?.response?.data));
			toast.error("Error editing post", {
				style: { color: "#fff", background: "#151f34", zIndex: 10002 }
			});
		}
	};

	return (
		<Modal
			sub="Edit Post"
			body="Edit your post if you want"
		>
			<ValidationErrors type="post" />

			<form onSubmit={onEditSubmit}>

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
	);
}

export default EditPost;