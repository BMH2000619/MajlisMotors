import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CarReviews from './CarReviews'
import ReviewForm from './ReviewForm'
import Client from '../services/api' 


const CarDetails = ({ user }) => {
  console.log('CarDetails user:', user)
  const { carId } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshReviews, setRefreshReviews] = useState(false)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await Client.get(`/cars/${carId}`)
        setCar(res.data)
      } catch (err) {
        setCar(null)
      } finally {
        setLoading(false)
      }
    }
    fetchCar()
  }, [carId])

  if (loading) return <div>Loading car details...</div>
  if (!car)
    return (
      <div className="car-category-container">
        <div className="category-title">Car Details</div>
        <p style={{ color: '#757575', textAlign: 'center' }}>Car not found.</p>
      </div>
    )

  const triggerRefresh = () => setRefreshReviews((prev) => !prev)

  return (
    <section className="car-category-container" aria-label="Car Details">
      <h2 className="category-title" style={{ marginBottom: 24 }}>
        {car.name}{' '}
        <span style={{ color: '#757575', fontWeight: 400 }}>({car.year})</span>
      </h2>
      <div
        className="car-details-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          marginBottom: 24
        }}
      >
        <img
          src={car.image}
          alt={car.name}
          className="car-details-img"
          style={{ display: 'block', margin: '0 auto' }}
        />
        <div className="car-details-info" style={{ textAlign: 'center' }}>
          <p>
            <strong>Type:</strong> {car.type}
          </p>
          <p>
            <strong>Description:</strong> {car.description}
          </p>
          <p>
            <strong>Year:</strong> {car.year}
          </p>
        </div>
      </div>

      <div className="car-reviews-container">
        {user ? (
          <ReviewForm
            carId={car._id}
            token={user.token}
            onReviewPosted={triggerRefresh}
          />
        ) : (
          <p style={{ textAlign: 'center', marginBottom: 18 }}>
            <a href="/signin">Sign in</a> to write a review.
          </p>
        )}
        <CarReviews
          carId={car._id}
          refresh={refreshReviews}
          user={user}
          onReviewChanged={triggerRefresh}
        />
      </div>
    </section>
  )
}

export default CarDetails
