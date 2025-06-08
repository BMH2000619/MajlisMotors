import Client from './api'

export const GetBrands = async () => {
  try {
    const res = await Client.get('/brands')
    return res.data
  } catch (error) {
    throw error
  }
}
