import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Login from './components/auth/Login';
import Navbar from './components/Navbar';
import Registar from './components/auth/Registar';
import Auth from './pages/Auth';
import Home from './pages/Home';
import toast, { Toaster } from "react-hot-toast";
import CreatePost from './components/post/CreatePost';
import EditPost from './components/post/EditPost';
import { useDispatch } from 'react-redux';
import { failLogin, startLogin, succedLogin } from './slices/authSlice';
import AuthService from './services/AuthService';
import { useEffect } from 'react';
import { getItem, setItem } from './services/StorageSystem';
import PostDetail from './components/post/PostDetail';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getUserRefresh = async () => {
    dispatch(startLogin())
    try {
      const res = await AuthService.refresh()
      setItem("token", res.accessToken)
      dispatch(succedLogin(res))
    } catch (error) {
      dispatch(failLogin())
      toast.error(error?.response?.data?.message, {
        style: { color: "#fff", background: "#151f34", zIndex: 10002 }
      })
    }
  }

  useEffect(() => {
    const token = getItem("token")
    if (token) {
      getUserRefresh()
    }
  }, [])
  return (
    <div>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path='/auth' element={<Auth />}>
          <Route index element={<Navigate to="/auth/login" />}></Route>
          <Route path='/auth/login' element={<Login />}></Route>
          <Route path='/auth/registar' element={<Registar />}></Route>
        </Route>
        <Route path='/' element={<Home />}>
          <Route path='/create' element={<CreatePost />}></Route>
          <Route path='/edit/:id' element={<EditPost />}></Route>
        </Route>
        <Route path='/detail/:id' element={<PostDetail />}></Route>
      </Routes>
      <Outlet />
    </div>
  )
}

export default App