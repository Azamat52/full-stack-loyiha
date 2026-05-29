import { configureStore } from "@reduxjs/toolkit";
import postSlice from '../slices/postSlice';
import authSlice from '../slices/authSlice';

export default configureStore({
  reducer: {
    post: postSlice,
    auth: authSlice, 
  },
})