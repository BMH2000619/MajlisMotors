import React from "react"
import CarBrands from "./CarBrands"
import Search from "./Search"
import "./Home.css"

const Home = ({ brands, onSearch }) => (
  <>
    <section className="home-hero">
      <h1 className="home-title">Welcome to Majlis Motors</h1>
      <p className="home-subtitle">
        Discover the best car deals and detailed information about your favorite
        vehicles.
      </p>
    </section>
    <CarBrands brands={brands} />
    <div
      style={{ display: "flex", justifyContent: "center", margin: "32px 0" }}
    >
      <Search onSearch={onSearch} />
    </div>
  </>
)

export default Home
