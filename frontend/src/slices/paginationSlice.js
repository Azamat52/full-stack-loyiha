import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentPage: 1,
  perPage: 10
}

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },

    setPerPage: (state, action) => {
      state.perPage = action.payload
      state.currentPage = 1
    },

    nextPage: (state, action) => {
      state.currentPage += 1
    },

    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1
      }
    }
  }
})

export const {
  setCurrentPage,
  setPerPage,
  nextPage,
  prevPage
} = paginationSlice.actions

export default paginationSlice.reducer