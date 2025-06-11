import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

const initialState = { email: '', password: '' }

const SignIn = ({ setUser }) => {
  const [formValues, setFormValues] = useState(initialState)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues(initialState)
    setUser(payload)
    console.log('JWT token in localStorage:', localStorage.getItem('token')) // <-- Add this line
    navigate('/')
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
              name="email"
              value={formValues.email}
              required
              onChange={handleChange}
              className="sigin-input"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formValues.password}
              required
              onChange={handleChange}
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

export default SignIn
