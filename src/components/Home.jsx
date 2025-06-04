import React, { useState } from "react"
import CarBrands from "./CarBrands"
import Search from "./Search"
import CarList from "./CarList"
import "./Home.css"

const Home = ({ brands, cars }) => {
  const [selectedBrand, setSelectedBrand] = useState(null)

  // Filter cars by selected brand
  const filteredCars = selectedBrand
    ? cars.filter((car) => car.make === selectedBrand)
    : []

  // When search is submitted, open YouTube search for the query
  const handleSearch = (query) => {
    if (query && query.trim() !== "") {
      const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
        query
      )}`
      window.open(youtubeUrl, "_blank")
    }
  }

  return (
    <>
      <CarBrands brands={brands} onBrandClick={setSelectedBrand} />
      <div
        style={{ display: "flex", justifyContent: "center", margin: "32px 0" }}
      >
        <Search onSearch={handleSearch} />
      </div>
      {selectedBrand && (
        <div style={{ marginTop: 32 }}>
          <CarList cars={filteredCars} />
        </div>
      )}
    </>
  )
}

export default Home
