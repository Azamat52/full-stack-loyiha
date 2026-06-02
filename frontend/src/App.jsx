import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Navbar from './components/Navbar';
import Registar from './components/Registar';
import Auth from './pages/Auth';
import Home from './pages/Home';
import { useEffect } from 'react';
import { getItem, setItem } from './services/StorageSystem';
import { useDispatch } from 'react-redux';
import AuthService from './services/AuthService';
import { succedLogin } from './slices/authSlice';

function App() {
	const dispatch = useDispatch()
	let refreshing = false
	const refresh = async () => {
		if (refreshing) return;
		try {
			refreshing = true
			const res = await AuthService.refresh()
			setItem("token", res.accessToken)
			dispatch(succedLogin(res))
		} catch (error) {
			console.log(error.response.data);
		} finally {
			refreshing = false
		}
	}
	useEffect(() => {
		const token = getItem("token")
		if (token) {
			refresh()
		}
	}, [])
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/auth' element={<Auth />}>
					<Route index element={<Navigate to="/auth/login" />}></Route>
					<Route path='/auth/login' element={<Login />}></Route>
					<Route path='/auth/registar' element={<Registar />}></Route>
				</Route>
				<Route path='/' element={<Home />}></Route>
			</Routes>
			<Outlet />
		</div>
	)
}

export default App