import React, { useEffect, useState } from 'react'
import { GetReviewsByCarId } from '../services/ShowReview'

const CarReviews = ({ carId, refresh }) => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await GetReviewsByCarId(carId)
        setReviews(data.reviews || [])
      } catch (err) {
        console.error('Failed to load reviews:', err)
        setReviews([])
      }
    }

    if (carId) {
      fetchReviews()
    }
  }, [carId, refresh])

  return (
    <div className="car-reviews-container">
      <h3>Reviews</h3>
      {reviews.length ? (
        reviews.map((r, i) => (
          <div key={i} className="car-reviews-item">
            <strong>
              {r.user_id?.firstName && r.user_id?.lastName
                ? `${r.user_id.firstName} ${r.user_id.lastName}`
                : r.user_id?.username || 'Anonymous'}
            </strong>
            : {r.comment} (⭐
            {r.rating})
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  )
}

export default CarReviews
