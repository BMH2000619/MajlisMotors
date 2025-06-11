import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import CarList from './components/CarList'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SignOut from './pages/SignOut'
import Profile from './components/Profile'
import About from './components/About'
import './App.css'

import { GetBrands } from './services/ShowBrands'
import { GetCars } from './services/ShowCars' // You already have this service!
import { CheckSession } from './services/Auth'

const App = () => {
  const [user, setUser] = useState(null)
  const [brands, setBrands] = useState([])
  const [cars, setCars] = useState([]) // NEW - we will load cars

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

  // Check session on load
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const sessionData = await CheckSession()
        setUser(sessionData.user) // Assuming your /auth/session returns { user: ... }
      } catch (err) {
        console.log('No valid session')
        setUser(null)
      }
    }

    checkUserSession()
  }, [])

  return (
    <Router>
      <Navbar user={user} />{' '}
      {/* Optional: can pass user if Navbar supports it */}
      <audio src="../../public/assets/sound.mp3" autoPlay loop />
      <Routes>
        <Route path="/" element={<Home brands={brands} />} />
        <Route path="/cars" element={<CarList cars={cars} user={user} />} />
        <Route path="/signin" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signout" element={<SignOut setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
