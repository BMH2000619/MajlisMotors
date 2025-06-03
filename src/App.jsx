import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/Home"
import CarList from "./components/CarList"
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
  // Add more cars as needed
]

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<CarList cars={cars} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
)

export default App
