import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
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
    }
  }
})

export const { addTodo, removeTodo, updateTodo } = UserSlice.actions;
export default UserSlice.reducer;
