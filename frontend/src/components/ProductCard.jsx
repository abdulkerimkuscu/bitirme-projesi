import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import { MdDelete, MdEdit } from "react-icons/md";
import { BsHeart } from "react-icons/bs";

const ProductCard = ({ edit, product, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        }).format(price);
    };

    const handleClick = (e, action) => {
        e.stopPropagation(); // Prevent navigation when clicking edit/delete
        if (action === 'edit') {
            onEdit && onEdit();
        } else if (action === 'delete') {
            onDelete && onDelete();
        }
    };

    return (
        <div 
            onClick={() => navigate(`/product/${product?._id}`)}
            className="group relative w-full max-w-[300px] rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
        >
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                {product?.images?.length > 1 ? (
                    <Slider {...settings} className="h-full">
                        {product.images.map((image, i) => (
                            <div key={i} className="relative h-full">
                                <img
                                    src={image.url}
                                    alt={`${product.name} - Görsel ${i + 1}`}
                                    className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <img
                        src={product?.images[0]?.url}
                        alt={product.name}
                        className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                )}
                
                <div className="absolute top-2 right-2 z-10 flex gap-2">
                    <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors" title="Favorilere Ekle">
                        <BsHeart className="text-gray-700 w-5 h-5" />
                    </button>
                    {edit && (
                        <>
                            <button 
                                onClick={(e) => handleClick(e, 'edit')}
                                className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors" 
                                title="Düzenle"
                            >
                                <MdEdit className="text-blue-600 w-5 h-5" />
                            </button>
                            <button 
                                onClick={(e) => handleClick(e, 'delete')}
                                className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors" 
                                title="Sil"
                            >
                                <MdDelete className="text-red-600 w-5 h-5" />
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-medium text-gray-900 text-lg line-clamp-1 mb-2">
                    {product.name}
                </h3>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-gray-500">
                        {product.stock > 0 ? `Stokta (${product.stock})` : 'Stokta Yok'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;