import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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
]

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<CarList cars={cars} />} />
    </Routes>
  </Router>
)

export default App