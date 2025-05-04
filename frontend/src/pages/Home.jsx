import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const dispatch = useDispatch();
    const {products, loading} = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts({
          keyword: "",
          price: { min: 0, max: 30000 },
          category: ""
        }))
    },[dispatch])

 
    
  return (
    <div className='min-h-screen'>
    {
        loading ? "Loading...": <div>
            {
                 products?.products && <div className='flex items-center justify-center gap-5 my-5 flex-wrap'>
                 {
                     products?.products?.map((product , i) => (
                       <ProductCard product = {product} key={i}/>  
                     ))
                 }
             </div>
            }
        </div>
    }
    
    </div>
  )
}
export default Home