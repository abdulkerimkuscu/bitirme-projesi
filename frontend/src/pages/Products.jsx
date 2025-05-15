import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/productSlice';
import Filter from '../layout/Filter';
import ProductCard from '../components/ProductCard';
import ReactPaginate from 'react-paginate';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { setFilters } from '../redux/generalSlice';

const ITEMS_PER_PAGE = 3;

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);
    const { keyword, filters } = useSelector((state) => state.general);
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + ITEMS_PER_PAGE;
    const currentItems = products?.products?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil((products?.products?.length || 0) / ITEMS_PER_PAGE);

    useEffect(() => {
        dispatch(getProducts({ 
            keyword, 
            price: filters.price,
            category: filters.category 
        }));
    }, [dispatch, keyword, filters]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * ITEMS_PER_PAGE) % (products?.products?.length || 0);
        setItemOffset(newOffset);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePriceChange = (price) => {
        dispatch(setFilters({ price }));
    };

    const handleCategoryChange = (category) => {
        dispatch(setFilters({ category }));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <AiOutlineLoading3Quarters className="animate-spin text-4xl text-orange-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Filter Section */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <Filter 
                            setPrice={handlePriceChange} 
                            setCategory={handleCategoryChange}
                            initialPrice={filters.price}
                            initialCategory={filters.category}
                        />
                    </div>

                    {/* Products Grid Section */}
                    <div className="flex-1">
                        {products?.products?.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                <p className="text-xl font-medium">Ürün Bulunamadı</p>
                                <p className="mt-2">Lütfen farklı filtreler deneyin</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentItems?.map((product, i) => (
                                        <ProductCard product={product} key={i} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pageCount > 1 && (
                                    <div className="mt-8 flex justify-center">
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel="Sonraki >"
                                            onPageChange={handlePageClick}
                                            pageRangeDisplayed={3}
                                            pageCount={pageCount}
                                            previousLabel="< Önceki"
                                            renderOnZeroPageCount={null}
                                            className="flex items-center gap-2"
                                            pageClassName="px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                                            pageLinkClassName="text-gray-700 font-medium"
                                            previousClassName="px-4 py-2 rounded-lg bg-orange-100 hover:bg-orange-200 transition-colors"
                                            nextClassName="px-4 py-2 rounded-lg bg-orange-100 hover:bg-orange-200 transition-colors"
                                            previousLinkClassName="text-orange-700 font-medium"
                                            nextLinkClassName="text-orange-700 font-medium"
                                            activeClassName="!bg-orange-500"
                                            activeLinkClassName="!text-white"
                                            breakClassName="text-gray-400"
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;