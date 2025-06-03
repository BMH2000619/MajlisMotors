import React, { useState } from "react"

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    setError("")
    setUser(username)
    alert(`Signed up as: ${username} (${email})`)
  }

  return (
    <div className="sigin-container">
      <h2 className="sigin-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="sigin-form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="sigin-input"
            placeholder="Enter your username"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="sigin-input"
            placeholder="Enter your email"
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="sigin-input"
            placeholder="Optional"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="sigin-input"
            placeholder="Enter your password"
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="sigin-input"
            placeholder="Confirm your password"
          />
        </label>
        {error && (
          <div style={{ color: "red", textAlign: "center" }}>{error}</div>
        )}
        <button type="submit" className="sigin-button">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Signup
