import React, { useEffect, useState } from "react"
import { GetReviewsByCarId, PostReview } from "../services/ShowReview"

const CarReviews = ({ carId, refresh }) => {
  const [reviews, setReviews] = useState([])
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [commit, setCommit] = useState("")
  const [commits, setCommits] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await GetReviewsByCarId(carId)
        setReviews(data.reviews || [])
      } catch (err) {
        console.error("Failed to load reviews:", err)
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
      setComment("")
      setRating(0)
      // Refresh reviews after posting
      const data = await GetReviewsByCarId(carId)
      setReviews(data.reviews || [])
    } catch (err) {
      alert("Failed to submit review.")
    }
    setSubmitting(false)
  }

  // Commit box logic (local only)
  const handleCommitSubmit = (e) => {
    e.preventDefault()
    if (!commit.trim()) return
    setCommits([...commits, commit.trim()])
    setCommit("")
  }

  return (
    <div className="car-reviews-container">
      <h3>Reviews</h3>
      <form onSubmit={handleSubmit} className="car-reviews-form">
        <div className="car-reviews-rating-row">
          <span className="car-reviews-rating-label">
            Your Rating:
          </span>
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={`car-reviews-star${num <= rating ? " active" : ""}`}
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
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
      {reviews.length ? (
        reviews.map((r, i) => (
          <div key={i} className="car-reviews-item">
            <strong>{r.user?.username || "Anonymous"}</strong>: {r.comment} (⭐
            {r.rating})
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      {/* Leave a Commit Section */}
      <form onSubmit={handleCommitSubmit} className="car-reviews-form" style={{ marginTop: 18 }}>
        <h4 style={{ margin: 0 }}>Leave a Commit</h4>
        <textarea
          value={commit}
          onChange={e => setCommit(e.target.value)}
          placeholder="Write a commit..."
          rows={2}
          className="car-reviews-textarea"
        />
        <button
          type="submit"
          className="car-reviews-submit-btn"
        >
          Submit Commit
        </button>
      </form>
      {commits.length > 0 && (
        <ul style={{ marginTop: 10, paddingLeft: 0 }}>
          {commits.map((c, idx) => (
            <li
              key={idx}
              style={{
                background: "rgba(255,255,255,0.18)",
                color: "#4a0080",
                borderRadius: 6,
                padding: "5px 10px",
                marginBottom: 4,
                fontSize: "0.96rem",
                wordBreak: "break-word",
                fontWeight: 600,
                boxShadow: "0 1px 4px #8a2be222",
                borderLeft: "4px solid #8a2be2",
                listStyle: "none",
              }}
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CarReviews
