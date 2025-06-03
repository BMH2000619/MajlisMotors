import React from "react"
import "./App.css"
import CarList from "./components/CarList"

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

const App = () => {
  return (
    <main className="App">
      <header>
        <h1>Car Listings</h1>
      </header>
      <CarList cars={cars} />
    </main>
  )
}

export default App
