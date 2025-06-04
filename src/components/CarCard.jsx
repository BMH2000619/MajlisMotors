import React, { useState } from "react"

const fallbackImg = "/images/ffff.jpg"

const carImages = {
  Toyota: "/images/ffff.jpg",
  Honda: "/images/honda.jpg",
  Nissan: "/images/nissan.jpg",
  Audi: "/images/audi.jpg",
  Mercedes: "/images/mercedes.jpg",
}

const CarCard = ({ car }) => {
  const [flipped, setFlipped] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [favorite, setFavorite] = useState(false)
  const [showReviewInput, setShowReviewInput] = useState(false)
  const carImg = car.image || carImages[car.make] || fallbackImg

  const handleStarClick = (star) => setRating(star)
  const handleFavorite = () => setFavorite((f) => !f)
  const handleReviewSubmit = (e) => {
    e.preventDefault()
    setShowReviewInput(false)
  }

  return (
    <div
      className={`car-card-flip-container${flipped ? " flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
      tabIndex={0}
      aria-label="Flip car card"
    >
      {/* Front: Car Image */}
      <div className="car-card-flip car-card-front">
        <img
          src={carImg}
          alt={`${car.make} ${car.model}`}
          className="car-card-img"
        />
        <div className="car-card-title">
          <span role="img" aria-label="car" className="car-card-emoji">
            🚗
          </span>
          {car.make} {car.model}{" "}
          <span className="car-card-year">({car.year})</span>
        </div>
        <div className="car-card-actions">
          {/* Rating */}
          <div className="car-card-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`car-card-star${star <= rating ? " active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleStarClick(star)
                }}
                role="button"
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                ★
              </span>
            ))}
          </div>
          {/* Favorite */}
          <span
            className={`car-card-favorite${favorite ? " active" : ""}`}
            onClick={(e) => {
              e.stopPropagation()
              handleFavorite()
            }}
            role="button"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            title={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            ♥
          </span>
        </div>
        {/* Review */}
        <div className="car-card-review">
          {review && (
            <div className="car-card-review-text">
              <b>Review:</b> {review}
            </div>
          )}
          {showReviewInput ? (
            <form
              onSubmit={(e) => {
                handleReviewSubmit(e)
                e.stopPropagation()
              }}
              className="car-card-review-form"
            >
              <input
                type="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write a review..."
                className="car-card-review-input"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="submit"
                className="car-card-review-save"
                onClick={(e) => e.stopPropagation()}
              >
                Save
              </button>
            </form>
          ) : (
            <button
              className="car-card-review-edit"
              onClick={(e) => {
                e.stopPropagation()
                setShowReviewInput(true)
              }}
            >
              {review ? "Edit Review" : "Add Review"}
            </button>
          )}
        </div>
      </div>
      {/* Back: Car Details */}
      <div className="car-card-flip car-card-back">
        <img
          src={carImg}
          alt={`${car.make} ${car.model}`}
          className="car-card-img"
          style={{ marginBottom: 12 }}
        />
        <div className="car-card-title">
          <span role="img" aria-label="car" className="car-card-emoji">
            🚗
          </span>
          {car.make} {car.model}{" "}
          <span className="car-card-year">({car.year})</span>
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
              <span className="car-detail-value car-detail-price">
                {car.price}
              </span>
            </li>
          )}
        </ul>
        <div className="car-card-flip-hint">Click to flip</div>
      </div>
    </div>
  )
}

export default CarCard

