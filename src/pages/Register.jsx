import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth'

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [img, setImg] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setError('')
    await RegisterUser({
      username,
      firstName,
      lastName,
      email,
      password,
      img // Optional, include only if uploading
    })
    alert(`Signed up as: ${firstName} ${lastName} (${email})`)
    navigate('/signin')
  }

  const onGoogleSignUp = () => {
    // Handle Google Sign Up here
    alert('Google Sign Up is not implemented yet.')
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
          First Name:
          <input
            type="text"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
            className="sigin-input"
            placeholder="Enter your first name"
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
            className="sigin-input"
            placeholder="Enter your last name"
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
        <label>
          Profile Image (optional):
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
            className="sigin-input"
          />
        </label>
        {error && (
          <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
        )}
        <button type="submit" className="sigin-button">
          Sign Up
        </button>
      </form>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <button
          type="button"
          className="google-signup-btn"
          onClick={onGoogleSignUp}
        >
          <span style={{
            display: "inline-block",
            width: 22,
            height: 22,
            marginRight: 10,
            background: "url('https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg') no-repeat center center/contain"
          }} />
          Sign Up with Google
        </button>
      </div>
    </div>
  )
}

export default Signup
