import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsDetail } from '../redux/productSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Button from '../components/Button';
const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getProductsDetail(id));
    }
  }, [dispatch, id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const addBasket = () => {

  }
  const decremenet = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }
  const incremenet = () => {
    if (quantity < product?.product?.stock) {
      setQuantity(quantity + 1)
    }
  }

  return (
    <div className='min-h-screen'>
      {loading ? (
        'Loading...'
      ) : (
        <div className="p-4">
          <div className="flex mt-4 justify-center gap-10">
            {product?.product && (
              <div className="w-[400px] h-[400px]">
                {product.product.images?.length > 1 ? (
                  <Slider {...settings}>
                    {product.product.images?.map((image, i) => (
                      <div key={i}>
                        <img
                          src={image.url}
                          alt={`Product image ${i + 1}`}
                          className="w-full h-[400px] object-cover rounded"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  product.product.images?.[0]?.url && (
                    <img
                      src={product.product.images[0].url}
                      alt="Product image"
                      className="w-full h-[400px] object-cover rounded"
                    />
                  )
                )}
              </div>
            )}
            <div className='space-y-3'>
            <div className="text-3xl">
              {product?.product?.name}
            </div>
            <div className="text-xl">
              {product?.product?.description}
            </div>
            {product?.product?.stock > 0 ? <div className='text-xl text-green-300'>{`Stok Adedi: ${product?.product?.stock}`}</div> : <div className='text-xl text-red-300'>Ürün Stokta Kalmamıştır</div> }
            <div className="text-xl">
              {`Kategori: ${product?.product?.category}`}
            </div>
            <div className="text-xl">
             {renderStars(product?.product?.rating || 0)}
            </div>
            <div className='flex items-center gap-2'>
              <button onClick={decremenet} className='text-2xl cursor pointer bg-gray-100 '>-</button>
              <div className='text-xl'>{quantity}</div>
              <button onClick={incremenet} className='text-2xl cursor pointer bg-gray-100'>+</button>
            </div>
            <Button text={"Sepete Ekle"} onClick={addBasket}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const renderStars = (rating) => {
  const fullStars = Math.floor(rating); // tam yıldız
  const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75; // yarım yıldız varsa
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0); // boş yıldız

  return (
    <>
      {Array(fullStars).fill().map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-500 inline" />
      ))}
      {hasHalf && <FaStarHalfAlt className="text-yellow-500 inline" />}
      {Array(emptyStars).fill().map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-500 inline" />
      ))}
    </>
  );
};

export default Detail;