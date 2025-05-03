import React from 'react'
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
const ProductCard = ({product}) => {

    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <div onClick={() => navigate(`/product/${product?._id}`) } className='w-[250px] bg-gray-100'>
    {product?.images?.length > 1 ? (
        <Slider {...settings} className='h-[200px] object-cover'>
          {product.images.map((image, i) => (
            <img
              key={i}
              src={image.url}
              alt={`Product image ${i + 1}`}
              className="w-full h-[200px] "
            />
          ))}
        </Slider>
      ) : (
        <img
          src={product?.images[0]?.url}
          alt="Product"
          className="w-full h-[200px] "
        />
      )} 
        <div className='text-xl p-3'>{product.name}</div>
        <div className='text-2xl p3'>{product.price}</div>
    
    </div>
  )
}

export default ProductCard