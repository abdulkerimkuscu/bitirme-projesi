import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    product: {},
    loading: false,
}

export const getProducts = createAsyncThunk(
    'products',

    async(params) => {
        let link = `http://localhost:4000/products?keyword=${params.keyword}&price[gte]=${params.price.min || 0}&price[lte]=${params.price.max || 30000}`
        
        if (params.category) {
            link = `http://localhost:4000/products?keyword=${params.keyword}&price[gte]=${params.price.min || 0}&price[lte]=${params.price.max || 30000}&category=${params.category}` 
        }
        const response = await fetch(link)

        return (await response.json())
    }
)
export const getProductsDetail = createAsyncThunk(
    'product',

    async(id) => {
        const response = await fetch(`http://localhost:4000/product/${id}`)

        return (await response.json())
    }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload
    })
    builder.addCase(getProductsDetail.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(getProductsDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const {  } = productSlice.actions

export default productSlice.reducer