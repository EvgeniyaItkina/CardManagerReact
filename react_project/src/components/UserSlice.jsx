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
      return null;
    },


    /* addTodo: (state, action) => {
      const todo = {
        id: Math.floor(Math.random() * 1000),
        text: action.payload
      }


      state.push(todo)
    },

    removeTodo: (state, action) => {
      return state = state.filter(todo => todo.id !== action.payload.id);
    },

    updateTodo: (state, action) => {
      //'action.payload' must reference the todo object to update and include the 'text' to update
      return state = state.map(todo => todo.id === action.payload.id ? action.payload : todo);
    } */
  }
})

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;
