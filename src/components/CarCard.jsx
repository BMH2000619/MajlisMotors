import React from "react"

const CarCard = ({ car }) => (
  <div className="car-category-container" style={{ marginBottom: 24 }}>
    <div className="category-title">
      {car.make} {car.model} ({car.year})
    </div>
    <ul className="car-details-list">
      {car.engine && (
        <li className="car-detail-item">
          <span className="car-detail-label">Engine</span>
          <span className="car-detail-value">{car.engine}</span>
        </li>
      )}
      {car.transmission && (
        <li className="car-detail-item">
          <span className="car-detail-label">Transmission</span>
          <span className="car-detail-value">{car.transmission}</span>
        </li>
      )}
      {car.color && (
        <li className="car-detail-item">
          <span className="car-detail-label">Color</span>
          <span className="car-detail-value">{car.color}</span>
        </li>
      )}
      {car.mileage && (
        <li className="car-detail-item">
          <span className="car-detail-label">Mileage</span>
          <span className="car-detail-value">{car.mileage}</span>
        </li>
      )}
      {car.price && (
        <li className="car-detail-item">
          <span className="car-detail-label">Price</span>
          <span className="car-detail-value">{car.price}</span>
        </li>
      )}
    </ul>
  </div>
)

export default CarCard