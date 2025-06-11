import React, { useEffect, useState } from 'react'
import { GetReviewsByCarId, PostReview } from '../services/ShowReview'

const CarReviews = ({ carId, refresh }) => {
  const [reviews, setReviews] = useState([])
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await GetReviewsByCarId(carId)
        setReviews(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Failed to load reviews:', err)
        setReviews([])
      }
    }

    if (carId) {
      fetchReviews()
    }
  }, [carId, refresh])
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim() || !rating) return
    setSubmitting(true)
    try {
      await PostReview(carId, comment, rating)
      setComment('')
      setRating(0)
      // Refresh reviews after posting
      const data = await GetReviewsByCarId(carId)
      setReviews(Array.isArray(data) ? data : [])
    } catch (err) {
      alert('Failed to submit review.')
    }
    setSubmitting(false)
  }

  return (
    <div className="car-reviews-container">
      <h3>Reviews</h3>
      <form onSubmit={handleSubmit} className="car-reviews-form">
        <div className="car-reviews-rating-row">
          <span className="car-reviews-rating-label">Your Rating:</span>
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={`car-reviews-star${num <= rating ? ' active' : ''}`}
              onClick={() => setRating(num)}
              role="button"
              tabIndex={0}
              aria-label={`Set rating to ${num}`}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          rows={2}
          className="car-reviews-textarea"
        />
        <button
          type="submit"
          disabled={submitting}
          className="car-reviews-submit-btn"
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
      {reviews.length ? (
        reviews.map((r, i) => (
          <div key={i} className="car-reviews-item">
            <strong>{r.user_id?.name || 'Anonymous'}</strong>: {r.content} (⭐
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
