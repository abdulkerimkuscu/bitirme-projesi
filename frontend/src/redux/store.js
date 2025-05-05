import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice'
import { generalReducer } from './generalSlice'
import { userReducer } from './userSlice'
import { cartReducer } from './cartSlice'

export default configureStore({
  reducer: {
    products: productSlice,
    general: generalReducer,
    user: userReducer,
    cart: cartReducer
  }
})