import React from "react"

const CarDetails = ({ car }) => {
  if (!car)
    return (
      <div className="car-category-container">
        <div className="category-title">Car Details</div>
        <p style={{ color: "#757575", textAlign: "center" }}>
          No car selected.
        </p>
      </div>
    )

  const categories = [
    {
      title: "Basic Info",
      details: [
        { label: "Make", value: car.make },
        { label: "Model", value: car.model },
        { label: "Year", value: car.year },
      ],
    },
    {
      title: "Specifications",
      details: [
        { label: "Engine", value: car.engine },
        { label: "Transmission", value: car.transmission },
        { label: "Color", value: car.color },
      ],
    },
    {
      title: "Other Details",
      details: [
        { label: "Mileage", value: car.mileage },
        { label: "Price", value: car.price },
      ],
    },
  ]

  return (
    <section className="car-category-container" aria-label="Car Details">
      <h2 className="category-title" style={{ marginBottom: 24 }}>
        {car.make} {car.model}{' '}
        <span style={{ color: '#757575', fontWeight: 400 }}>({car.year})</span>
      </h2>
      {categories.map(
        (cat, idx) =>
          cat.details.some((d) => d.value) && (
            <div key={idx} style={{ marginBottom: 20 }}>
              <h3
                className="category-title"
                style={{ fontSize: '1.1rem', marginBottom: 10 }}
              >
                {cat.title}
              </h3>
              <ul className="car-details-list">
                {cat.details.map(
                  (detail, i) =>
                    detail.value && (
                      <li className="car-detail-item" key={i}>
                        <span className="car-detail-label">{detail.label}</span>
                        <span className="car-detail-value">{detail.value}</span>
                      </li>
                    )
                )}
              </ul>
            </div>
          )
      )}
      {car.description && (
        <div style={{ marginBottom: 20 }}>
          <h3
            className="category-title"
            style={{ fontSize: '1.1rem', marginBottom: 10 }}
          >
            Description
          </h3>
          <p style={{ lineHeight: '1.5' }}>{car.description}</p>
        </div>
      )}
    </section>
  )
}

export default CarDetails
