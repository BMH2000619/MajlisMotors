import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import CarList from './components/CarList'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SignOut from './pages/SignOut'
import Profile from './components/profile'
import About from './components/About'
import './App.css'
import { GetBrands } from './services/ShowBrands'

const App = () => {
  const [user, setUser] = useState(null)
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await GetBrands()
        setBrands(data) // Store full brand objects now!
      } catch (err) {
        console.error('Failed to fetch brands:', err)
      }
    }

    fetchBrands()
  }, [])

  return (
    <Router>
      <Navbar />
      <audio src="../../public/assets/sound.mp3" autoPlay loop />
      <Routes>
        <Route path="/" element={<Home brands={brands} />} />
        <Route path="/cars" element={<CarList cars={[]} />} /> {/* Optional */}
        <Route path="/signin" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signout" element={<SignOut setUser={setUser} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
