// components/ReviewForm.jsx
import React, { useState } from 'react'
import { PostReview } from '../services/ShowReview'

const ReviewForm = ({ carId, token, onReviewPosted }) => {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await PostReview({ carId, comment, rating }, token)
      setComment('')
      setRating(0)
      onReviewPosted()
    } catch (err) {
      console.error('Failed to post review:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h4>Write a Review</h4>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review here..."
        required
        style={{ width: '100%', minHeight: '80px' }}
      />
      <br />
      <div style={{ margin: '10px 0' }}>
        <span>Rating: </span>
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            style={{
              cursor: 'pointer',
              color: num <= rating ? '#FFD700' : '#ccc',
              fontSize: '1.5em'
            }}
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
      <br />
      <button type="submit" style={{ marginTop: '10px' }}>
        Submit Review
      </button>
    </form>
  )
}

export default ReviewForm
