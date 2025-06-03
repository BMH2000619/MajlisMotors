import React from "react"
import Navbar from "./Navbar"
import "./Home.css"

const Home = () => (
  <div>
    <Navbar />
    <main className="App">
      <header>
        <h1>Welcome to Majlis Motors</h1>
        <p className="home-subtitle">
          Discover the best car deals and detailed information about your favorite vehicles.
        </p>
      </header>
      <section className="home-section">
        <h2 className="home-section-title">Find Your Next Car</h2>
        <p className="home-section-desc">
          Browse our listings to see detailed specs, prices, and more.
        </p>
      </section>
    </main>
  </div>
)

export default Home