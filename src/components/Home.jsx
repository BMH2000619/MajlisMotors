import React, { useState } from "react"
import CarBrands from "./CarBrands"
import Search from "./Search"
import CarList from "./CarList" // Make sure this shows car details
import "./Home.css"

const Home = ({ brands, cars, onSearch }) => {
  const [selectedBrand, setSelectedBrand] = useState(null)

  // Filter cars by selected brand
  const filteredCars = selectedBrand
    ? cars.filter((car) => car.make === selectedBrand)
    : []

  return (
    <>
      <CarBrands brands={brands} onBrandClick={setSelectedBrand} />
      <div
        style={{ display: "flex", justifyContent: "center", margin: "32px 0" }}
      >
        <Search onSearch={onSearch} />
      </div>
      {selectedBrand && (
        <div style={{ marginTop: 32 }}>
          <h2 style={{ color: "#1a237e" }}>{selectedBrand} Cars</h2>
          <CarList cars={filteredCars} />
        </div>
      )}
    </>
  )
}

export default Home
