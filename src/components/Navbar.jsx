import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import profilePic from '../../public/images/default-profile.jpg'

const Navbar = ({ user, setUser }) => {
  const location = useLocation()
  const navigate = useNavigate()

  // Show back button only on car details page
  const showBackBtn = /^\/cars\/[^/]+$/.test(location.pathname)

  const handleProfileClick = () => {
    navigate('/profile')
  }

  const handleSignOut = () => {
    console.log('User signed out through Navbar component')
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          {user && (
            <div
              className="navbar-profile-link"
              onClick={handleProfileClick}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={
                  user.img ? `http://localhost:3001/${user.img}` : profilePic
                }
                alt="Profile"
                className="navbar-profile-pic"
              />
              <span>
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.username || 'Profile'}
              </span>
            </div>
          )}
          <Link to="/" className="navbar-home-link">
            Home
          </Link>
          <Link to="/about" className="navbar-about-link">
            About
          </Link>
        </div>
        <div className="navbar-title-wrapper">
          <span className="navbar-title">Majlis Motors</span>
        </div>
        <div className="navbar-actions-box">
          {user ? (
            <button className="navbar-action-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <>
              <Link to="/signin" className="navbar-action-btn">
                Sign In
              </Link>
              <Link to="/register" className="navbar-action-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      {showBackBtn && (
        <button
          className="car-details-back-btn"
          onClick={() => navigate(-1)}
          style={{ marginRight: 18 }}
        >
          ← Back
        </button>
      )}
    </nav>
  )
}

export default Navbar
