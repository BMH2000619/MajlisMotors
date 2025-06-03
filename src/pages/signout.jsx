import React from "react"
import Navbar from "../components/Navbar"

const SignOut = ({ setUser }) => {
  const handleSignOut = () => {
    setUser(null)
    alert("Signed out!")
  }

  return (
    <div>
      <div className="sigin-container">
        <h2 className="sigin-title">Sign Out</h2>
        <button className="sigin-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default SignOut