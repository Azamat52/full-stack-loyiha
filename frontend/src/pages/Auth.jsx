import React, { useEffect } from 'react'
import Registar from '../components/auth/Registar'
import Login from '../components/auth/Login'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingOverlay from '../components/loader/LoadingOverlay'

function Auth() {
	const { loggedIn, isLoading, isRegistar } = useSelector((state) => state.auth)
	const navigate = useNavigate()
	useEffect(() => {
		if (loggedIn) {
			navigate("/")
		}
	}, [loggedIn])
	return (
		<div
			className='w-100 vh-100 py-5'
			style={{ background: '#020617' }}
		>
			{isRegistar && <LoadingOverlay />}
			{isLoading && <LoadingOverlay />}
			<div className='container'>
				<div className="d-flex justify-content-center gap-4 mb-5 fade-page slide-top" style={{ width: "32%", margin: "0 auto" }}>

					<NavLink
						to="/auth/login"
						className="auth-link"
					>
						Login
					</NavLink>

					<NavLink
						to="/auth/registar"
						className="auth-link"
					>
						Register
					</NavLink>

				</div>
				<Outlet />
			</div>
		</div>
	)
}

export default Auth
