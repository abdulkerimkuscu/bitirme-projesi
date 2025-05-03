import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/productSlice';
import Filter from '../layout/Filter';
import ProductCard from '../components/ProductCard';

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products)
    const { keyword } = useSelector((state) => state.general)
    const [price, setPrice] = useState({min: 0, max: 30000})
    const [category, setCategory] = useState("")

    
    useEffect(() => {
        dispatch(getProducts({keyword, price,category}))
    }, [dispatch, keyword, price,category] )
    
    return (
        <div className='min-h-screen'>
            <div className='flex gap-3'>
                <Filter setPrice = {setPrice} setCategory={setCategory} />
                <div>
                    {
                        loading ? "Loading..." : <div>
                            {
                                products?.products && <div className='flex items-center justify-center gap-5 my-5 flex-wrap'>
                                    {
                                        products?.products?.map((product, i) => (
                                            <ProductCard product={product} key={i} />
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
            <div>pagination</div>
        </div>

    )
}

export default Products