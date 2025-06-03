import React, { useState } from "react"

const CarBrands = ({ cars }) => {
  const [open, setOpen] = useState(false)

  // Get unique brands
  const brands = [...new Set(cars.map((car) => car.make))]

  return (
    <section className="car-brands-container">
      <button
        className="car-brands-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {open ? "Hide Car Brands" : "Show Car Brands"}
      </button>
      {open && (
        <ul className="car-brands-list">
          {brands.map((brand, idx) => (
            <li key={idx} className="car-brand-item">
              {brand}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CarBrands
