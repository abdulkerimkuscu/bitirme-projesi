import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice'
import { generalReducer } from './generalSlice'

export default configureStore({
  reducer: {
    products: productSlice,
    general: generalReducer
  }
})