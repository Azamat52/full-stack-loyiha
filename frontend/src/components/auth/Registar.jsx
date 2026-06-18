import React, { useEffect, useState } from 'react'
import Input from '../../ui/Input'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { clearError, failRegistar, startRegistar, succedRegistar } from '../../slices/authSlice';
import AuthService from '../../services/AuthService';
import ValidationErrors from '../ValidationErrors';
import { toast } from 'react-hot-toast';

function Registar() {
	const { isLoading, loggedIn, isRegistar } = useSelector((state) => state.auth)
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const Reset = () => { setUsername(""); setEmail(""); setPassword("") }
	const handleSubmit = async (e) => {
		e.preventDefault()
		dispatch(startRegistar())
		const newUser = { username, email, password }
		try {
			await AuthService.registar(newUser)
			dispatch(succedRegistar())
			navigate("/auth/login")
			Reset()
			toast.success("Registered successfully", { style: { color: "#fff", background: "#151f34" } })
		} catch (error) {
			dispatch(failRegistar(error?.response?.data))
			toast.error("Error registering", { style: { color: "#fff", background: "#151f34" } })
		}
	}

	useEffect(() => {
		if (loggedIn) {
			navigate("/")
		}
	}, [loggedIn])
	useEffect(() => {
		dispatch(clearError())
	}, [])
	return (
		<div className="d-flex justify-content-center fade-page slide-top">
			
			<form
				onSubmit={handleSubmit}
				className="p-4"
				style={{
					width: "420px",
					background: "#0f172a",
					border: "1px solid #1e293b",
					borderRadius: "24px",
					boxShadow: "0 0 30px rgba(0,0,0,0.4)"
				}}
			>

				{/* Header */}
				<div className="mb-4 text-center">
					<h1
						className="fw-bold text-white mb-2"
						style={{ fontSize: "34px" }}
					>
						Register
					</h1>

					<p className="text-secondary mb-0">
						Create your new account
					</p>
				</div>

				<ValidationErrors type="auth" />

				{/* Inputs */}
				<div className="d-flex flex-column gap-3">

					<Input
						type="email"
						id="email"
						label="Email"
						value={email}
						setState={setEmail}
					/>

					<Input
						id="username"
						label="Username"
						value={username}
						setState={setUsername}
					/>

					<Input
						type="password"
						id="password"
						label="Password"
						value={password}
						setState={setPassword}
					/>

				</div>

				{/* Buttons */}
				<div className="d-flex gap-3 mt-4">

					<button
						type="submit"
						disabled={isRegistar}
						className="btn btn-light w-50 py-2 rounded-pill fw-semibold"
					>
						{isRegistar ? "Registaring..." : "Register"}
					</button>

					<button
						type="button"
						onClick={Reset}
						className="btn text-white w-50 py-2 rounded-pill fw-semibold"
						style={{
							backgroundColor: "#020617",
							border: "1px solid #334155",
						}}
					>
						Reset
					</button>

				</div>
				<br />
				<div className='text-white'>You hava an account? <NavLink to="/auth/login">Login</NavLink></div>
			</form>

		</div>
	)
}

export default Registar