import { configureStore } from "@reduxjs/toolkit";
import postSlice from '../slices/postSlice';
import authSlice from '../slices/authSlice';
import paginationSlice from '../slices/paginationSlice';

export default configureStore({
  reducer: {
    post: postSlice,
    auth: authSlice,
    paginations: paginationSlice
  },
})