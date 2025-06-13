import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  user: {
    name: '',
    email: '',
    phone: '',
    role: '',
    full_name: '',
    image_url: ''
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logoutUser: (state, action) => {
      state.token = ''
      state.user = {
        name: '',
        email: '',
        phone: '',
        role: '',
        full_name: '',
        image_url: ''
      }
    }
  }
})

export const { setUser, logoutUser } = userSlice.actions
export default userSlice.reducer
