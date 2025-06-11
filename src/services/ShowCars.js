import Client from './api'

export const GetCars = async () => {
  try {
    const res = await Client.get('/cars')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetCarsByBrand = async (brandId) => {
  try {
    const res = await Client.get(`/brands/${brandId}/cars`)
    return res.data
  } catch (error) {
    throw error
  }
}
