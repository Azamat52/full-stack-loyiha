import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { useOpenModal } from '../hooks/useOpenModal';
import AuthService from '../services/AuthService';
import { logout } from '../slices/authSlice';

function Navbar() {
  const { loggedIn, user, isLoading } = useSelector((state) => state.auth)
  const { onOpen } = useOpenModal()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const LogOut = async () => {
    try {
      await AuthService.logout()
      dispatch(logout())
      navigate("/auth")
    } catch (error) {
      console.log(error.response?.data);
    }
  }

  return (
    <div style={{ backgroundColor: "#0f172a" }}>
      <nav
        className="navbar container navbar-expand-lg py-3"
      >
        <div className="container-fluid">

          {/* Logo */}
          <Link
            to="/"
            className="navbar-brand text-white fw-bold fs-2 d-flex align-items-center gap-2"
          >
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: "45px",
                height: "45px",
                background: "#7c3aed",
              }}
            >
              <span className="text-white fw-bold">S</span>
            </div>

            Sammi
          </Link>
          {/* Buttons */}
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn text-white px-4 py-2 rounded-pill fw-semibold"
              style={{
                backgroundColor: "#020617",
                border: "1px solid #1e293b",
              }}
              onClick={onOpen}
            >
              Create Post
            </button>

            {loggedIn ? (
              <div className='position-relative'>

                <div className='user-wrapper d-flex align-items-center gap-3'>

                  {/* USER */}
                  <div className='user-box'>

                    <div className='user-icon'>
                      <i className="fa-regular fa-user"></i>
                    </div>

                    <p className='user-name m-0'>
                      {user.userDto.username}
                    </p>

                  </div>

                  {/* LOGOUT */}
                  <button
                    className="btn btn-light px-4 py-2 rounded-pill fw-semibold"
                    onClick={LogOut}
                    disabled={isLoading}
                  >
                    {isLoading ? "Wait.." : "Log Out"}
                  </button>

                  {/* HOVER BOX */}
                  <div className='user-hover-box'>

                    <p className='m-0 text-white'>
                      {user.userDto.isActivated ? "Account is activated" : "Account is not activated"}
                    </p>

                    {/* <p className='m-0 text-white'>
                      Settings
                    </p> */}

                  </div>

                </div>

              </div>
            ) : (
              <Link to="/auth">
                <button className="btn btn-light px-4 py-2 rounded-pill fw-semibold">
                  Get Start
                </button>
              </Link>
            )
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar