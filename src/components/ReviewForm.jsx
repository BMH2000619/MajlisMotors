import React, { useState } from 'react'
import axios from 'axios'

const ReviewForm = ({ carId, token, onReviewPosted }) => {
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(5)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        '/api/reviews',
        { content, rating, car_id: carId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setContent('')
      setRating(5)
      onReviewPosted() // callback to refresh reviews
    } catch (err) {
      console.error('Error posting review', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3 className="category-title">Write a Review</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Your review..."
        style={{ width: '100%', height: '80px', marginBottom: 10 }}
        required
      />
      <div style={{ marginBottom: 10 }}>
        Rating:{' '}
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min={1}
          max={10}
          required
        />
      </div>
      <button
        type="submit"
        style={{
          background: '#1890ff',
          color: 'white',
          border: 'none',
          padding: '6px 12px',
          cursor: 'pointer',
          borderRadius: 4
        }}
      >
        Submit Review
      </button>
    </form>
  )
}

export default ReviewForm
