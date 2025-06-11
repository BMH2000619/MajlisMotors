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
      <label>
        Rating (1-5):{' '}
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />
      </label>
      <br />
      <button type="submit" style={{ marginTop: '10px' }}>
        Submit Review
      </button>
    </form>
  )
}

export default ReviewForm
