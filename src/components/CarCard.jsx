import React, { useState } from 'react'
import CarReviews from './CarReviews'
import ReviewForm from './ReviewForm'

const fallbackImg = '/images/ffff.jpg'

const carImages = {
  // Toyota: '/images/ffff.jpg',
  // Honda: '/images/honda.jpg',
  // Nissan: '/images/nissan.jpg',
  // Audi: '/images/audi.jpg',
  // Mercedes: '/images/mercedes.jpg'
}

const CarCard = ({ car, user }) => {
  const [flipped, setFlipped] = useState(false)
  const [refreshReviews, setRefreshReviews] = useState(false)

  const carImg = car.image || carImages[car.make] || fallbackImg

  const triggerRefresh = () => setRefreshReviews((prev) => !prev)

  return (
    <div
      className={`car-card-flip-container${flipped ? ' flipped' : ''}`}
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
          🚗 {car.make} {car.model}{' '}
          <span className="car-card-year">({car.year})</span>
        </div>

        <div style={{ marginTop: '10px' }}>
          <CarReviews carId={car._id} refresh={refreshReviews} />
        </div>

        {user ? (
          <ReviewForm
            carId={car._id}
            token={user.token}
            onReviewPosted={triggerRefresh}
          />
        ) : (
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
            <a href="/login">Sign in</a> to write a review.
          </p>
        )}
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
          🚗 {car.make} {car.model}{' '}
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
