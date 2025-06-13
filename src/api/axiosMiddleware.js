import axios from 'axios'

import { store } from '@/redux-store/index'
import { logoutUser } from '@/redux-store/slices/userSlice'
import { toast } from 'react-toastify'

const url = process.env.NEXT_PUBLIC_API_URL
const subUrl = process.env.NEXT_PUBLIC_API_SUBURL

const api = axios.create({
  baseURL: `${url}${subUrl}/`
})

const getStoredToken = async () => {
  const state = store.getState()

  return state?.User?.token
}

api.interceptors.request.use(
  async config => {
    try {
      const authToken = await getStoredToken()

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`
      }

      // config.headers["Content-Type"] = "multipart/form-data"
      return config
    } catch (error) {
      console.error('Error in token retrival', error)

      return Promise.reject(error)
    }
  },
  error => {
    console.error('Error in inceptor', error)

    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    try {
      return response
    } catch (error) {
      console.error('Error while fetching data', error)
      return Promise.reject(error)
    }
  },
  error => {
    console.error('Error while fetching data', error)
    toast.error(error?.response?.data?.message)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      store.dispatch(logoutUser()) // Uncomment if you have a logout action
      console.warn('Unauthorized access - redirecting to login')
      window.location.href = '/login' // Redirect to login page
    }

    return Promise.reject(error)
  }
)

export default api
