import React from "react"
import { Link, useNavigate } from "react-router-dom"
import profilePic from "../images/dodge.jpg" // Make sure this image exists

const Navbar = () => {
  const navigate = useNavigate()

  const handleProfileClick = () => {
    navigate("/profile")
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div
          className="navbar-left"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <img
            src={profilePic}
            alt="Profile"
            className="navbar-profile-pic"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #fff",
              cursor: "pointer",
            }}
            onClick={handleProfileClick}
          />
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
          <Link to="/signin" className="navbar-action-btn">
            Sign Up
          </Link>
          <Link to="/login" className="navbar-action-btn">
            Login
          </Link>
          <Link to="/signout" className="navbar-action-btn">
            Sign Out
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
