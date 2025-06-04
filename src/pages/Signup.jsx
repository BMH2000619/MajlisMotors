import React, { useState } from 'react'
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setError('')
    const user = {
      username,
      firstName,
      lastName,
      email,
      password,
      img
    }
    setUser(user)
    await RegisterUser({
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      img: img // Optional, include only if uploading
    })

    alert(`Signed up as: ${firstName} ${lastName} (${email})`)
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
    </div>
  )
}

export default Signup
