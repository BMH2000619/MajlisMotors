import React from 'react'
import { useNavigate } from 'react-router-dom'

const CarCard = ({ car, carId }) => {
  const navigate = useNavigate()

  return (
    <div
      className="car-card"
      tabIndex={0}
      aria-label="View car details"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/cars/${carId}`)}
    >
      <img src={car.image} alt={car.name} className="car-card-img" />
      <div className="car-card-title">{car.name}</div>
    </div>
  )
}

export default CarCard
