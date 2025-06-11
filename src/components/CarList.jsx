import React from 'react'
import CarCard from './CarCard'

const CarList = ({ cars, user }) => (
  <section className="car-list-section">
    <h2 className="car-list-title">Available Cars</h2>
    <div className="car-list-grid">
      {cars && cars.length > 0 ? (
        cars.map((car) => (
          <div
            key={car._id} // MongoDB _id is correct key
            className="car-list-card-wrapper"
            aria-label={`View details for ${car.make} ${car.model}`}
          >
            <CarCard car={car} user={user} />
          </div>
        ))
      ) : (
        <p className="car-list-empty">No cars available.</p>
      )}
    </div>
  </section>
)

export default CarList
