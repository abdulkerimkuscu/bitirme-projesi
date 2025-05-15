import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  keyword: "",
  openModal: false,
  filters: {
    price: { min: 0, max: 0 },
    category: ""
  }
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    getKeyword: (state, action) => {
      state.keyword = action.payload
    },
    openModalFunc: (state, action) => {
      state.openModal = !state.openModal
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.keyword = initialState.keyword;
    }
  },
})

// Action creators are generated for each case reducer function
export const { getKeyword, openModalFunc, setFilters, resetFilters } = generalSlice.actions

export const generalReducer = generalSlice.reducer