import Client from './api'

// Example - should return an array
export const GetReviewsByCarId = async (carId) => {
  const res = await Client.get(`/reviews/car/${carId}`)
  return res.data // should be the array directly
}


// /services/ShowReview.js
export const PostReview = async (carId, comment, rating) => {
  const res = await Client.post('/reviews', {
    car_id: carId,
    comment: comment, // must match backend
    rating
  })
  return res.data
}


