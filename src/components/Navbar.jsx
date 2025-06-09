import React from "react"
import { Link, useNavigate } from "react-router-dom"
import profilePic from "../../public/images/dodge.jpg"

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
          style={{ display: "flex", alignItems: "center", gap: "14px" }}
        >
          <img
            src={profilePic}
            alt="Profile"
            className="navbar-profile-pic"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2.5px solid #fff",
              boxShadow: "0 2px 8px rgba(74,0,128,0.13)",
              cursor: "pointer",
              transition: "box-shadow 0.2s",
            }}
            onClick={handleProfileClick}
            title="View Profile"
          />
          <Link to="/" className="navbar-home-link">
            Home
          </Link>
          <Link to="/about" className="navbar-about-link">
            About
          </Link>
        </div>
        <div className="navbar-title-wrapper">
          <span
            className="navbar-title"
            style={{
              fontWeight: 800,
              fontSize: "1.4rem",
              letterSpacing: "1.5px",
              color: "#fff",
              textShadow: "0 2px 8px #4a0080",
            }}
          >
            Majlis Motors
          </span>
        </div>
        <div className="navbar-actions-box" style={{ gap: "10px" }}>
          <Link to="/signin" className="navbar-action-btn">
            Sign Up
          </Link>
          <Link to="/login" className="navbar-action-btn">
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
