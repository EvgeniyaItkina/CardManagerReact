import { configureStore } from '@reduxjs/toolkit';
import { UserSlice } from './components/UserSlice';

export default configureStore({
  reducer: {
    user: UserSlice
  }

})