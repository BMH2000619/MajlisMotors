import React, { useState } from 'react'
import CarReviews from './CarReviews'
import ReviewForm from './ReviewForm'

const CarDetails = ({ car, user }) => {
  const [refreshReviews, setRefreshReviews] = useState(false)

  if (!car)
    return (
      <div className="car-category-container">
        <div className="category-title">Car Details</div>
        <p style={{ color: '#757575', textAlign: 'center' }}>
          No car selected.
        </p>
      </div>
    )

  const triggerRefresh = () => setRefreshReviews((prev) => !prev)

  return (
    <section className="car-category-container" aria-label="Car Details">
      <h2 className="category-title" style={{ marginBottom: 24 }}>
        {car.make} {car.model}{' '}
        <span style={{ color: '#757575', fontWeight: 400 }}>({car.year})</span>
      </h2>
      <ul className="car-details-list">
        <li className="car-detail-item">
          <span className="car-detail-label">Engine:</span>
          <span className="car-detail-value">{car.engine}</span>
        </li>
        <li className="car-detail-item">
          <span className="car-detail-label">Transmission:</span>
          <span className="car-detail-value">{car.transmission}</span>
        </li>
        <li className="car-detail-item">
          <span className="car-detail-label">Color:</span>
          <span className="car-detail-value">{car.color}</span>
        </li>
        <li className="car-detail-item">
          <span className="car-detail-label">Mileage:</span>
          <span className="car-detail-value">{car.mileage}</span>
        </li>
        <li className="car-detail-item">
          <span className="car-detail-label">Price:</span>
          <span className="car-detail-value">{car.price}</span>
        </li>
      </ul>

      <CarReviews carId={car._id} refresh={refreshReviews} />

      {user ? (
        <ReviewForm
          carId={car._id}
          token={user.token}
          onReviewPosted={triggerRefresh}
        />
      ) : (
        <p>
          <a href="/login">Sign in</a> to write a review.
        </p>
      )}
    </section>
  )
}

export default CarDetails
