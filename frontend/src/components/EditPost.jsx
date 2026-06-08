import React from 'react'
import Modal from './Modal'
import ValidationErrors from './ValidationErrors'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editPostfail, editPostStart, editPostSucced } from '../slices/postSlice'
import PostService from '../services/PostService'

function EditPost() {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [body, setBody] = useState("")
	const { isLoading } = useSelector((state) => state.post)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { id } = useParams()
	const Reset = () => { setTitle(""); setBody(""); setDescription("") }
	const handleEditSubmit = async (e) => {
		e.preventDefault()
		const updatedPost = { title, description, body }
		dispatch(editPostStart())
		try {
			await PostService.editById(id, updatedPost)
			dispatch(editPostSucced())
		} catch (error) {
			dispatch(editPostfail(error.response?.data))
		}
	}
	return (
		<div>
			<Modal
				sub="Edit Post"
				body="Edit your post if you want"
				onClose={onClose}
			>
				<ValidationErrors type="post" />
				<form onSubmit={handleeditSubmit} className='d-flex flex-column gap-3 w-100'>
					<Input
						label="Title"
						id="title"
						value={title}
						placeholder="Title"
						setState={setTitle}
						disabled={isLoading}
					/>
					<Input
						label="Description"
						id="description"
						value={description}
						placeholder="Description"
						setState={setDescription}
						disabled={isLoading}
					/>
					<TextArea
						label="Body"
						id="body"
						value={body}
						setState={setBody}
						disabled={isLoading}
					/>
					<div className='d-flex gap-3 w-100'>
						<button className="btn btn-light w-100 px-4 py-2 rounded-pill fw-semibold"
							disabled={isLoading}
						>
							{isLoading ? "Creating..." : "Create"}
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

export default EditPost
