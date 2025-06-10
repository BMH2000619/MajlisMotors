import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CarReviews = ({ carId, currentUserId, token }) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/reviews/car/${carId}`)
      setReviews(res.data)
    } catch (err) {
      console.error('Error fetching reviews', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (carId) {
      fetchReviews()
    }
  }, [carId])

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchReviews() // reload reviews
    } catch (err) {
      console.error('Error deleting review', err)
    }
  }

  if (loading) return <p>Loading reviews...</p>

  return (
    <section className="car-category-container" aria-label="Car Reviews">
      <h2 className="category-title">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <ul className="car-details-list">
          {reviews.map((review) => (
            <li key={review._id} className="car-detail-item">
              <div>
                <strong>{review.user_id?.name}</strong> rated{' '}
                <b>{review.rating}/10</b>
              </div>
              <p style={{ margin: '6px 0' }}>{review.content}</p>
              {review.user_id?._id === currentUserId && (
                <button
                  onClick={() => handleDelete(review._id)}
                  style={{
                    background: '#ff4d4f',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    borderRadius: 4
                  }}
                >
                  Delete My Review
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CarReviews
