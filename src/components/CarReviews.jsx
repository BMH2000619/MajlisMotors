import React, { useEffect, useState } from 'react'
import {
  GetReviewsByCarId,
  DeleteReview,
  UpdateReview
} from '../services/ShowReview'

const CarReviews = ({ carId, refresh, user, onReviewChanged }) => {
  const [reviews, setReviews] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editComment, setEditComment] = useState('')
  const [editRating, setEditRating] = useState(0)

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

  const handleDelete = async (reviewId) => {
    if (window.confirm('Delete this review?')) {
      try {
        await DeleteReview(reviewId, user.token)
        onReviewChanged()
      } catch (err) {
        alert('Failed to delete review.')
      }
    }
  }

  const startEdit = (review) => {
    setEditingId(review._id)
    setEditComment(review.comment)
    setEditRating(review.rating)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      await UpdateReview(
        editingId,
        { comment: editComment, rating: editRating },
        user.token
      )
      setEditingId(null)
      onReviewChanged()
    } catch (err) {
      alert('Failed to update review.')
    }
  }

  return (
    <div className="car-reviews-container">
      <h3>Reviews</h3>
      {reviews.length ? (
        reviews.map((r, i) => (
          <div key={i} className="car-reviews-item">
            <strong>{r.user_id?.name || 'Anonymous'}</strong>:{' '}
            {editingId === r._id ? (
              <form onSubmit={handleEditSubmit} style={{ display: 'inline' }}>
                <input
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  required
                  style={{ width: 200 }}
                />
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={editRating}
                  onChange={(e) => setEditRating(Number(e.target.value))}
                  required
                  style={{ width: 50, marginLeft: 8 }}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                {r.comment} (⭐{r.rating})
                {user && r.user_id && r.user_id._id === user.id && (
                  <>
                    {' '}
                    <button onClick={() => startEdit(r)}>Edit</button>
                    <button onClick={() => handleDelete(r._id)}>Delete</button>
                  </>
                )}
              </>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  )
}

export default CarReviews