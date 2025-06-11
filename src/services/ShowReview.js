import Client from './api'

export const GetReviewsByCarId = async (carId) => {
  const res = await Client.get(`/reviews/car/${carId}`)
  return { reviews: res.data }
}

export const PostReview = async ({ carId, comment, rating }, token) => {
  return Client.post(
    '/reviews',
    { car_id: carId, comment, rating },
    { headers: { Authorization: `Bearer ${token}` } }
  )
}
