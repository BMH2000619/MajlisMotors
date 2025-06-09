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
            <ul className="car-details-list">
              {/* ...other details... */}
              {car.price && (
                <li className="car-detail-item">
                  {/* <span className="car-detail-label">Price:</span> */}
                  {/* <span className="car-detail-value car-detail-price">
                    {car.price}
                  </span> */}
                </li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p className="car-list-empty">No cars available.</p>
      )}
    </div>
  </section>
)

export default CarList
