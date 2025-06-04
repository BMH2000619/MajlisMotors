import React from "react"
import CarCard from "./CarCard"

const CarList = ({ cars, onCarClick }) => (
  <section className="car-list-section">
    <h2 className="car-list-title">Available Cars</h2>
    <div className="car-list-grid">
      {cars && cars.length > 0 ? (
        cars.map((car, idx) => (
          <div
            key={car.id || idx}
            className="car-list-card-wrapper"
            onClick={() => onCarClick && onCarClick(car)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (onCarClick && (e.key === "Enter" || e.key === " "))
                onCarClick(car)
            }}
            aria-label={`View details for ${car.make} ${car.model}`}
          >
            <CarCard car={car} />
          </div>
        ))
      ) : (
        <p className="car-list-empty">No cars available.</p>
      )}
    </div>
  </section>
)

export default CarList
