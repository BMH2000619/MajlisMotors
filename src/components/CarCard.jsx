import React, { useState, useEffect } from "react"
import CarReviews from "./CarReviews"
import {
  GetReviewsByCarId,
  PostReview,
  GetCommitsByCarId,
  PostCommit,
} from "../services/ShowReview"

const CarCard = ({ car }) => {
  const [flipped, setFlipped] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const [commits, setCommits] = useState([])

  const handleCommentSubmit = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (comment.trim() === "") return
    setComments([...comments, comment])
    setComment("")
  }

  // Jump to back side for reviews/favorite/like
  const handleJumpToReviews = (e) => {
    e.stopPropagation()
    setFlipped(true)
  }

  // Only allow double click to flip back from the back side
  const handleBackDoubleClick = (e) => {
    e.stopPropagation()
    setFlipped(false)
  }

  // Fetch commits from backend
  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const data = await GetCommitsByCarId(car._id)
        setCommits(data.commits || [])
      } catch (err) {
        setCommits([])
      }
    }
    if (car._id) fetchCommits()
  }, [car._id])

  // Post commit to backend
  const handleCommitSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    await PostCommit(car._id, comment)
    setComment("")
    // Refresh commits after posting
    const data = await GetCommitsByCarId(car._id)
    setCommits(data.commits || [])
  }

  return (
    <div
      className={`car-card-flip-container${flipped ? " flipped" : ""}`}
      tabIndex={0}
      aria-label="Flip car card"
      style={{ cursor: "pointer" }}
      onClick={() => !flipped && setFlipped(true)}
      // Only allow double click to flip back
    >
      {/* Front Side */}
      <div className="car-card-flip car-card-front">
        <img src={car.image} alt={car.model} className="car-card-img" />
        <div className="car-card-title">
          <span role="img" aria-label="car" className="car-card-emoji">
            🚗
          </span>
          {car.make} {car.model}{" "}
          <span className="car-card-year">({car.year})</span>
        </div>
        {car.price && <div className="car-card-price">{car.price}</div>}
        {/* Jump to Reviews Button */}
        <button
          className="car-card-jump-btn"
          type="button"
          onClick={handleJumpToReviews}
        >
          Reviews &amp; Favorite
        </button>
        <div className="car-card-flip-hint">Click to see details</div>
      </div>
      {/* Back Side */}
      <div
        className="car-card-flip car-card-back"
        onDoubleClick={handleBackDoubleClick}
        title="Double click to flip back"
        style={{ cursor: "pointer" }}
      >
        <img src={car.image} alt={car.model} className="car-card-img" />
        <div className="car-card-title car-card-title-back">
          {car.make} {car.model}{" "}
          <span className="car-card-year">({car.year})</span>
        </div>
        <ul className="car-details-list">
          {car.engine && (
            <li className="car-detail-item">
              <span className="car-detail-label">Engine:</span>
              <span className="car-detail-value">{car.engine}</span>
            </li>
          )}
          {car.transmission && (
            <li className="car-detail-item">
              <span className="car-detail-label">Transmission:</span>
              <span className="car-detail-value">{car.transmission}</span>
            </li>
          )}
          {car.color && (
            <li className="car-detail-item">
              <span className="car-detail-label">Color:</span>
              <span className="car-detail-value">{car.color}</span>
            </li>
          )}
          {car.mileage && (
            <li className="car-detail-item">
              <span className="car-detail-label">Mileage:</span>
              <span className="car-detail-value">{car.mileage}</span>
            </li>
          )}
          {car.price && (
            <li className="car-detail-item">
              <span className="car-detail-label">Price:</span>
              <span className="car-detail-value car-detail-price">
                {car.price}
              </span>
            </li>
          )}
        </ul>
        {/* Favorite and Rating */}
        <div className="car-card-fav-rating" style={{ marginBottom: 10 }}>
          <span
            className="car-fav"
            title={favorite ? "Remove from favorites" : "Add to favorites"}
            onClick={(e) => {
              e.stopPropagation()
              setFavorite((f) => !f)
            }}
            role="button"
            tabIndex={0}
            aria-label="Toggle favorite"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation()
                setFavorite((f) => !f)
              }
            }}
          >
            {favorite ? "★" : "☆"}
          </span>
          <span className="car-rating">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={`car-rating-star${num <= rating ? " active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setRating(num)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation()
                    setRating(num)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Set rating to ${num}`}
              >
                ★
              </span>
            ))}
          </span>
        </div>
        <CarReviews carId={car._id} />
        {commits.length > 0 && (
          <ul>
            {commits.map((c, idx) => (
              <li key={idx}>
                {c.user?.username || "Anonymous"}: {c.text}
              </li>
            ))}
          </ul>
        )}
        <div className="car-card-flip-hint">Double click to go back</div>
      </div>
    </div>
  )
}

export default CarCard
