import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from './components/auth/Login';
import Navbar from './components/Navbar';
import Registar from './components/auth/Registar';
import Auth from './pages/Auth';
import Home from './pages/Home';
import { Toaster } from "react-hot-toast";
import CreatePost from './components/post/CreatePost';
import EditPost from './components/post/EditPost';

function App() {
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
      </Routes>
      <Outlet />
    </div>
  )
}

export default App