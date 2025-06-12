import Client from './api'


export const GetReviewsByCarId = async (carId) => {
  const res = await Client.get(`/reviews/car/${carId}`)
  return res.data 
}


export const PostReview = async ({ carId, comment, rating }, token) => {
  const res = await Client.post(
    '/reviews',
    { car_id: carId, comment, rating },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return res.data
}

export const DeleteReview = async (reviewId, token) => {
  return Client.delete(`/reviews/${reviewId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const UpdateReview = async (reviewId, data, token) => {
  return Client.put(`/reviews/${reviewId}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

