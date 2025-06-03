import React from "react"

const CarDetails = ({ car }) => {
  if (!car) return null

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
    <div className="car-category-container">
      {categories.map(
        (cat, idx) =>
          cat.details.some((d) => d.value) && (
            <div key={idx}>
              <div className="category-title">{cat.title}</div>
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
    </div>
  )
}

export default CarDetails