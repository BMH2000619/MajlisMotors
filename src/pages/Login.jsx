import React, { useState } from 'react'
import { SignInUser } from '../services/Auth'

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUser(email)
    await SignInUser({ email, password })
    alert(`Logged in as: ${email}`)
  }

  return (
    <div>
      <div className="sigin-container">
        <h2 className="sigin-title">Login</h2>
        <form onSubmit={handleSubmit} className="sigin-form">
          <label>
            Email:
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="sigin-input"
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
            />
          </label>
          <button type="submit" className="sigin-button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
