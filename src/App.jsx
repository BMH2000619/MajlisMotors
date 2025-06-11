import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import CarList from './components/CarList'
import Signup from './pages/Register'
import Login from './pages/SignIn'
import SignOut from './pages/SignOut'
import Profile from './components/Profile'
import About from './components/About'
import './App.css'

import { GetBrands } from './services/ShowBrands'
import { GetCars } from './services/ShowCars'
import { CheckSession } from './services/Auth'

const App = () => {
  const [user, setUser] = useState(null)
  const [brands, setBrands] = useState([])
  const [cars, setCars] = useState([])

  // Load brands
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

  // Load cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await GetCars()
        setCars(data)
      } catch (err) {
        console.error('Failed to fetch cars:', err)
      }
    }
    fetchCars()
  }, [])

  // Check session
  useEffect(() => {
    const token = localStorage.getItem('token')
    const checkUserSession = async () => {
      try {
        const sessionData = await CheckSession()
        setUser(sessionData.user) // Adjust if CheckSession returns just user
      } catch (err) {
        console.log('No valid session')
        setUser(null)
      }
    }

    if (token) {
      checkUserSession()
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
        <Route path="/cars" element={<CarList cars={cars} user={user} />} />
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
