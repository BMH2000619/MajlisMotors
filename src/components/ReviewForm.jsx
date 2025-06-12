// components/ReviewForm.jsx
import React, { useState } from 'react'
import { PostReview } from '../services/ShowReview'

const ReviewForm = ({ carId, token, onReviewPosted }) => {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim() || !rating) return
    setSubmitting(true)
    try {
      await PostReview({ carId, comment, rating }, token)
      setComment('')
      setRating(0)
      if (onReviewPosted) onReviewPosted()
    } catch (err) {
      alert('Failed to submit review.')
    }
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="car-reviews-form">
      <h4>Write a Review</h4>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review here..."
        required
        className="car-reviews-textarea"
        style={{ minHeight: '80px' }}
      />
      <div className="car-reviews-rating-row">
        <span className="car-reviews-rating-label">Rating: </span>
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            className={`car-reviews-star${num <= rating ? ' active' : ''}`}
            style={{ fontSize: '1.5em' }}
            onClick={() => setRating(num)}
            role="button"
            tabIndex={0}
            aria-label={`Set rating to ${num}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setRating(num)
            }}
          >
            ★
          </span>
        ))}
      </div>
      <button
        type="submit"
        className="car-reviews-submit-btn"
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}

export default ReviewForm
