import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import profilePic from '../../public/images/dodge.jpg'

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate()

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
                src={user.profileImage || profilePic}
                alt="Profile"
                className="navbar-profile-pic"
              />
              <span>{user.name || user.username || 'Profile'}</span>
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
    </nav>
  )
}

export default Navbar
