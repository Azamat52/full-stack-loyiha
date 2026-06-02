import React from 'react'
import Registar from '../components/Registar'
import Login from '../components/Login'
import { NavLink, Outlet } from 'react-router-dom'

function Auth() {
	return (
		<div
			className='w-100 vh-100 py-5'
			style={{ background: '#020617' }}
		>
			<div className='container'>
				<div className="d-flex justify-content-center gap-4 mb-5 fade-page slide-top" style={{width: "32%", margin: "0 auto" }}>

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
