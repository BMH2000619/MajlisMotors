import React from "react"
import { Link } from "react-router-dom"

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-content">
      <div className="navbar-left">
        <Link to="/" className="navbar-home-link">
          Home
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

export default Navbar
