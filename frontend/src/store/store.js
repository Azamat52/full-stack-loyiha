import { configureStore } from "@reduxjs/toolkit";
import postSlice from '../slices/PostSlice';

export default configureStore({
  reducer: {
    post: postSlice, 
  },
})