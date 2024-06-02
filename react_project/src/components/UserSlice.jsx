import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

export const UserSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login: (state, action) => {
      const userData = jwtDecode(action.payload)
      console.log("state:", state);
      console.log("action:", action);
      return { ...state, ...userData };
    },

    logout: (state, action) => {
      return null
    },

  }
})

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;
