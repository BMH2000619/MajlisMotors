import React, { useState } from "react"

const CarBrands = ({ brands, onBrandClick }) => {
  const [open, setOpen] = useState(false)

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
            <li
              key={idx}
              className="car-brand-item"
              style={{ cursor: "pointer" }}
              onClick={() => onBrandClick(brand)}
            >
              {brand}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CarBrands
