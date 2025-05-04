import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/productSlice';
import Filter from '../layout/Filter';
import ProductCard from '../components/ProductCard';
import ReactPaginate from 'react-paginate';

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products)
    const { keyword } = useSelector((state) => state.general)
    const [price, setPrice] = useState({min: 0, max: 30000})
    const [category, setCategory] = useState("")
    const [itemOffset, setItemOffset] = useState(0);

    
    const endOffset = itemOffset + 3;
    const currentItems = products?.products?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products?.products?.length / 3);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 3) % products?.products?.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };

    
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
                                        currentItems.map((product, i) => (
                                            <ProductCard product={product} key={i} />
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
            <div>
            <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
            </div>
        </div>

    )
}

export default Products