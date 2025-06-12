import React, { useState, useEffect } from 'react'
import CarBrands from './CarBrands'
import Search from './Search'
import CarList from './CarList'
import './Home.css'
import { GetCarsByBrand } from '../services/ShowCars' 

const Home = ({ brands }) => {
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [cars, setCars] = useState([])

  const handleBrandClick = async (brand) => {
    setSelectedBrand(brand)
    try {
      const brandCars = await GetCarsByBrand(brand._id)
      setCars(brandCars)
    } catch (err) {
      console.error('Failed to fetch cars:', err)
      setCars([])
    }
  }

  const handleSearch = (query) => {
    if (query && query.trim() !== '') {
      const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
        query
      )}`
      window.open(youtubeUrl, '_blank')
    }
  }

  return (
    <>
      <CarBrands brands={brands} onBrandClick={handleBrandClick} />
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}
      >
        <Search onSearch={handleSearch} />
      </div>
      {selectedBrand && (
        <div style={{ marginTop: 32 }}>
          <h2 style={{ textAlign: 'center' }}>Cars for {selectedBrand.name}</h2>
          <CarList cars={cars} />
        </div>
      )}
    </>
  )
}

export default Home
