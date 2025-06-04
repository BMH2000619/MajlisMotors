import React, { useState } from "react"
import CarBrands from "./CarBrands"
import Search from "./Search"
import CarCard from "./CarCard"
import "./Home.css"

const Home = ({ brands, cars, onSearch }) => {
  const [selectedCar, setSelectedCar] = useState(null)

  return (
    <div className="main-container">
      <div className="home-section">
        <CarBrands brands={brands} onCarClick={(car) => setSelectedCar(car)} />
        <div className="search-bar-container">
          <Search onSearch={onSearch} />
        </div>
        {selectedCar && (
          <div className="selected-car-container">
            <CarCard car={selectedCar} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
