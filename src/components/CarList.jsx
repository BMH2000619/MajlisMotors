import React from "react"
import CarCard from "./CarCard"
import Navbar from "./Navbar"

const CarList = ({ cars }) => (
  <div>
    <Navbar />
    <h2 style={{ textAlign: "center", color: "#1a237e" }}>Car List</h2>
    {cars && cars.length > 0 ? (
      cars.map((car, idx) => <CarCard car={car} key={idx} />)
    ) : (
      <p style={{ textAlign: "center", color: "#757575" }}>
        No cars available.
      </p>
    )}
  </div>
)

export default CarList