import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

export const UserSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      console.log("action", action);
      console.log("state", state);
      localStorage.setItem('token', token);
      const userData = jwtDecode(action.payload)
      return { ...state, ...userData, token };
    },

    logout: (state, action) => {
      localStorage.removeItem('token');
      return null
    },
  }
})

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;
