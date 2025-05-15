import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      getProducts({
        keyword: '',
        price: { min: 0, max: 30000 },
        category: '',
      })
    );
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Ürünlerimizi Keşfedin
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-gray-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.products?.map((product, i) => (
              <ProductCard product={product} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;