import React, { useEffect, useState } from 'react'
import {
  GetReviewsByCarId,
  DeleteReview,
  UpdateReview
} from '../services/ShowReview'
import Client from '../services/api'

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
        setReviews([])
      }
    }
    if (carId) fetchReviews()
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

  // Helper to render stars
  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < rating ? 'car-reviews-star active' : 'car-reviews-star'}
      >
        ★
      </span>
    ))

  return (
    <>
      <h3>Reviews</h3>
      {reviews.length ? (
        reviews.map((r, i) => {
          const isOwner =
            user &&
            r.user_id &&
            (r.user_id._id === user.id || r.user_id === user.id)
          const reviewerName =
            r.user_id?.firstName && r.user_id?.lastName
              ? `${r.user_id.firstName} ${r.user_id.lastName}`
              : r.user_id?.username || 'Anonymous'

          return (
            <div key={i} className="car-reviews-item">
              <strong>{reviewerName}</strong>
              {editingId === r._id ? (
                <form
                  onSubmit={handleEditSubmit}
                  style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                    marginTop: 6
                  }}
                >
                  <input
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    required
                    className="car-reviews-edit-input"
                    style={{ width: 200 }}
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editRating}
                    onChange={(e) => setEditRating(Number(e.target.value))}
                    required
                    className="car-reviews-edit-input"
                    style={{ width: 50 }}
                  />
                  <button type="submit" className="car-reviews-submit-btn">
                    Save
                  </button>
                  <button
                    type="button"
                    className="car-reviews-edit-btn"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <div>{r.comment}</div>
                  <div>{renderStars(r.rating)}</div>
                  {isOwner && (
                    <div className="car-reviews-actions">
                      <button
                        className="car-reviews-edit-btn"
                        onClick={() => startEdit(r)}
                      >
                        Edit
                      </button>
                      <button
                        className="car-reviews-delete-btn"
                        onClick={() => handleDelete(r._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )
        })
      ) : (
        <p>No reviews yet.</p>
      )}
    </>
  )
}

export default CarReviews
