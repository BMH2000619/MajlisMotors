import React, { useState } from "react"

const CarCard = ({ car }) => {
  const [favorite, setFavorite] = useState(false)
  const [rating, setRating] = useState(0)
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`car-card-flip-container${flipped ? " flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
      tabIndex={0}
      aria-label="Flip car card"
      style={{ cursor: "pointer" }}
    >
      {/* Front: Car Image and Basic Info */}
      <div className="car-card-flip car-card-front">
        <img src={car.image} alt={car.model} className="car-card-img" />
        <div className="car-card-title">
          <span role="img" aria-label="car" className="car-card-emoji">
            🚗
          </span>
          {car.make} {car.model}{" "}
          <span className="car-card-year">({car.year})</span>
        </div>
        <div className="car-card-flip-hint">Click to see details</div>
      </div>
      {/* Back: Car Details */}
      <div className="car-card-flip car-card-back">
        <img src={car.image} alt={car.model} className="car-card-img" />
        <div
          className="car-card-title"
          style={{
            color: "#4a0080",
            fontWeight: 800,
            fontSize: "1.3rem",
            marginBottom: 10,
          }}
        >
          {car.make} {car.model}{" "}
          <span className="car-card-year">({car.year})</span>
        </div>
        <ul
          className="car-details-list"
          style={{ fontSize: "1.08rem", margin: "0 0 16px 0" }}
        >
          {car.engine && (
            <li className="car-detail-item">
              <span className="car-detail-label">Engine:</span>
              <span className="car-detail-value">{car.engine}</span>
            </li>
          )}
          {car.transmission && (
            <li className="car-detail-item">
              <span className="car-detail-label">Transmission:</span>
              <span className="car-detail-value">{car.transmission}</span>
            </li>
          )}
          {car.color && (
            <li className="car-detail-item">
              <span className="car-detail-label">Color:</span>
              <span className="car-detail-value">{car.color}</span>
            </li>
          )}
          {car.mileage && (
            <li className="car-detail-item">
              <span className="car-detail-label">Mileage:</span>
              <span className="car-detail-value">{car.mileage}</span>
            </li>
          )}
          {car.price && (
            <li className="car-detail-item">
              <span className="car-detail-label">Price:</span>
              <span className="car-detail-value car-detail-price">
                {car.price}
              </span>
            </li>
          )}
        </ul>
        {/* Favorite and Rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: 10,
          }}
        >
          {/* Favorite icon */}
          <span
            className="car-fav"
            title={favorite ? "Remove from favorites" : "Add to favorites"}
            style={{
              cursor: "pointer",
              fontSize: "1.5rem",
              color: favorite ? "#ffd54f" : "#8a2be2",
              transition: "color 0.2s",
            }}
            onClick={(e) => {
              e.stopPropagation()
              setFavorite((f) => !f)
            }}
            role="button"
            tabIndex={0}
            aria-label="Toggle favorite"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation()
                setFavorite((f) => !f)
              }
            }}
          >
            {favorite ? "★" : "☆"}
          </span>
          {/* Rating stars */}
          <span className="car-rating">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                style={{
                  cursor: "pointer",
                  color: num <= rating ? "#ffd54f" : "#8a2be2",
                  fontSize: "1.3rem",
                  transition: "color 0.2s",
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setRating(num)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation()
                    setRating(num)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Set rating to ${num}`}
              >
                ★
              </span>
            ))}
          </span>
        </div>
        <div
          className="car-card-flip-hint"
          style={{ color: "#8a2be2", fontWeight: 600 }}
        >
          Click to go back
        </div>
      </div>
    </div>
  )
}

export default CarCard
