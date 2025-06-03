import React from "react"
import CarBrands from "./CarBrands"
import "./Home.css"

const Home = ({ brands }) => (
  <div className="home-root">
    <section className="home-hero">
      <h1 className="home-title">Welcome to Majlis Motors</h1>
      <p className="home-subtitle">
        Discover the best car deals and detailed information about your favorite vehicles.
      </p>
    </section>
    <CarBrands brands={brands} />
    <section className="home-section">
      <h2 className="home-section-title">Find Your Next Car</h2>
      <p className="home-section-desc">
        Browse our listings to see detailed specs, prices, and more.
      </p>
    </section>
  </div>
)

export default Home
