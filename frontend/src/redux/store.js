import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice'
import { generalReducer } from './generalSlice'
import { userSlice } from './userSlice'

export default configureStore({
  reducer: {
    products: productSlice,
    general: generalReducer,
    user: userSlice
  }
})