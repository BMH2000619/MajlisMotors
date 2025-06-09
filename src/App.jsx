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
    image: "/images/ffff.jpg",
  },
  {
    make: "Honda",
    model: "Civic-type R",
    year: 2024,
    engine: "2.0L v4 turbo",
    transmission: "Manual",
    color: "Black",
    mileage: "20,000 km",
    price: "$25,500",
    image: "/images/civic.jpg",
  },
  {
    make: "Nissan",
    model: "skyline",
    year: 2000,
    engine: "RB26 v6 twin turbo",
    transmission: "Manual",
    color: "blue",
    mileage: "25,00 km",
    price: "$55,000",
    image: "/images/nissan.jpg",
  },
  {
    make: "Audi",
    model: "RS6",
    year: 2022,
    engine: "v10 Turbo",
    transmission: "Automatic",
    color: "black",
    mileage: "10,000 km",
    price: "$60,000",
    image: "/images/audi.jpg",
  },
  {
    make: "Mercedes",
    model: "C-63",
    year: 2013,
    engine: "6.3L Turbo",
    transmission: "Automatic",
    color: "black",
    mileage: "5,000 km",
    price: "$42,000",
    image: "/images/mercedes.jpg", // Add this line (place mercedes.jpg in public/images)
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
      <audio src="../../public/assets/sound.mp3" autoPlay loop />
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
