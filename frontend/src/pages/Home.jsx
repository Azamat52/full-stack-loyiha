import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
	const {loggedIn} = useSelector((state) => state.auth)
	const navigate = useNavigate() 
 	useEffect(() => {
		if (!loggedIn) {
			navigate("/auth")
		}
	}, [])
	return (
		<div
			className='w-100 vh-100'
			style={{ background: '#020617' }}
		>
			<div className='container text-white fade-page slide-top'>Home</div>
		</div>
	)
}

export default Home