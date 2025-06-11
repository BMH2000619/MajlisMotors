import React, { useEffect, useState } from 'react'
import { GetReviewsByCarId } from '../services/ShowReview'

const CarReviews = ({ carId, refresh }) => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await GetReviewsByCarId(carId)
        setReviews(data.reviews || []) // ✅ SAFE: use reviews array or empty
      } catch (err) {
        console.error('Failed to load reviews:', err)
        setReviews([]) // fallback if error
      }
    }

    if (carId) {
      fetchReviews()
    }
  }, [carId, refresh])

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Reviews</h3>
      {reviews.length ? (
        reviews.map((r, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <strong>{r.user?.username || 'Anonymous'}</strong>: {r.comment} (⭐
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
