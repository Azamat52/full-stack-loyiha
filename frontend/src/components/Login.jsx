import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import Input from '../ui/Input'
import { useDispatch, useSelector } from 'react-redux';
import { failLogin, startLogin, succedLogin } from '../slices/authSlice';
import AuthService from '../services/AuthService';

function Login() {
	const { isLoading, loggedIn } = useSelector((state) => state.auth)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		dispatch(startLogin())
		const newUser = { email, password }
		try {
			const res = await AuthService.login(newUser)
			dispatch(succedLogin(res))
			navigate("/")
			Reset()
		} catch (error) {
			dispatch(failLogin(error.response?.data))
		}
	}
	const Reset = () => { setEmail(""); setPassword("") }

	useEffect(() => {
		if (loggedIn) {
			navigate("/")
		}
	}, [loggedIn])
	return (
		<div
			className="d-flex justify-content-center fade-page slide-top"
		>

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
						Login
					</h1>

					<p className="text-secondary mb-0">
						Welcome back to your account
					</p>
				</div>

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
						disabled={isLoading}
						className="btn btn-light w-50 py-2 rounded-pill fw-semibold"
					>
						{isLoading ? "Loading..." : "Login"}
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
				<div className='text-white'>You don't hava an account? <NavLink to="/auth/registar">Registar</NavLink></div>
			</form>

		</div>
	)
}

export default Login