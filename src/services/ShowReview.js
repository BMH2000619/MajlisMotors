import Client from './api'

export const GetReviewsByCarId = async (carId) => {
  try {
    const res = await Client.get(`/cars/${carId}/reviews`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const PostReview = async (data, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const res = await Client.post(`/reviews`, data, config)
    return res.data
  } catch (error) {
    throw error
  }
}
