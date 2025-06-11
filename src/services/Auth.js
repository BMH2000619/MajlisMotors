import Client from './api'

export const SignInUser = async (data) => {
  const res = await Client.post('/auth/login', data)
  localStorage.setItem('token', res.data.token)
  console.log('Signed in user:', res.data.user) // Log user data
  return res.data.user // Make sure this is the full user object
}

export const RegisterUser = async (data) => {
  const res = await Client.post('/auth/register', data)
  return res.data
}

export const CheckSession = async () => {
  const res = await Client.get('/auth/session')
  return res.data
}
