import React from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Home from './pages/Home';

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/auth' element={<Auth />}></Route>
				<Route path='/' element={<Home />}></Route>
			</Routes>
		</div>
	)
}

export default App