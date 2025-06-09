import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import CarList from "./components/CarList"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import SignOut from "./pages/SignOut"
import Profile from "./components/profile"
import About from "./components/About"
import "./App.css"

const cars = [
  {
    make: "Toyota",
    model: "Camry",
    year: 2022,
    engine: "2.5L I4",
    transmission: "Automatic",
    color: "White",
    mileage: "15,000 km",
    price: "$22,000",
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2021,
    engine: "2.0L I4",
    transmission: "Manual",
    color: "Black",
    mileage: "20,000 km",
    price: "$19,500",
  },
  {
    make: "Nissan",
    model: "Altima",
    year: 2020,
    engine: "2.5L I4",
    transmission: "Automatic",
    color: "Silver",
    mileage: "25,000 km",
    price: "$18,000",
  },
  {
    make: "Audi",
    model: "A4",
    year: 2022,
    engine: "2.0L Turbo",
    transmission: "Automatic",
    color: "Blue",
    mileage: "10,000 km",
    price: "$35,000",
  },
  {
    make: "Mercedes",
    model: "C-Class",
    year: 2023,
    engine: "2.0L Turbo",
    transmission: "Automatic",
    color: "Gray",
    mileage: "5,000 km",
    price: "$42,000",
  },
]

const brands = ["Toyota", "Honda", "Nissan", "Audi", "Mercedes"]

const App = () => {
  const [user, setUser] = useState(null)

  // Google Sign Up handler (demo, replace with real logic)
  const handleGoogleSignUp = () => {
    window.open(
      "https://accounts.google.com/signin/oauth", // Replace with your OAuth endpoint
      "_blank"
    )
  }

  return (
    <Router>
      <Navbar />
      <audio
        src="../../public/assets/sound.mp3"
        autoPlay
        loop
      />
      <Routes>
        <Route path="/" element={<Home brands={brands} cars={cars} />} />
        <Route path="/cars" element={<CarList cars={cars} />} />
        <Route
          path="/signin"
          element={
            <Signup setUser={setUser} onGoogleSignUp={handleGoogleSignUp} />
          }
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signout" element={<SignOut setUser={setUser} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
