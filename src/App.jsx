import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import CarList from './components/CarList'
import Signup from './pages/Register'
import Login from './pages/SignIn'
import SignOut from './pages/SignOut'
import Profile from './components/profile'
import About from './components/About'
import './App.css'
import { GetBrands } from './services/ShowBrands'
import { CheckSession } from './services/Auth'

const App = () => {
  const [user, setUser] = useState(null)
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await GetBrands()
        setBrands(data)
      } catch (err) {
        console.error('Failed to fetch brands:', err)
      }
    }
    fetchBrands()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const checkToken = async () => {
      try {
        const user = await CheckSession()
        setUser(user)
      } catch (err) {
        setUser(null)
      }
    }
    if (token) {
      checkToken()
    } else {
      setUser(null)
    }
  }, [])

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <audio src="../../public/assets/sound.mp3" autoPlay loop />
      <Routes>
        <Route path="/" element={<Home brands={brands} />} />
        <Route path="/cars" element={<CarList cars={[]} />} />
        <Route path="/register" element={<Signup setUser={setUser} />} />
        <Route path="/signin" element={<Login setUser={setUser} />} />
        <Route path="/signout" element={<SignOut setUser={setUser} />} />
        <Route
          path="/profile"
          element={<Profile user={user} setUser={setUser} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
