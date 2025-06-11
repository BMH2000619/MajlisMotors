import React from 'react'
import CarCard from './CarCard'

const CarList = ({ cars, user }) => (
  <section className="car-list-section">
    <h2 className="car-list-title">Available Cars</h2>
    <div className="car-list-grid">
      {cars && cars.length > 0 ? (
        cars.map((car) => (
          <CarCard key={car._id} car={car} carId={car._id} user={user} />
        ))
      ) : (
        <p className="car-list-empty">No cars available.</p>
      )}
    </div>
  </section>
)

export default CarList
