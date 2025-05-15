import React, { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';

const Filter = ({ setPrice, setCategory, initialPrice, initialCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState(initialCategory || '');
    const [localPrice, setLocalPrice] = useState({
        min: initialPrice?.min || '',
        max: initialPrice?.max || ''
    });
    
    const categoryList = [
        "Çanta", "Saat", "Ayakkabı", "Pantolon", "Kamp Malzemeleri"
    ];

    useEffect(() => {
        setSelectedCategory(initialCategory || '');
        setLocalPrice({
            min: initialPrice?.min || '',
            max: initialPrice?.max || ''
        });
    }, [initialCategory, initialPrice]);

    // Debounced price update function
    const debouncedSetPrice = useCallback(
        debounce((newPrice) => {
            // Validate price range before updating
            if (newPrice.max && newPrice.min && Number(newPrice.max) < Number(newPrice.min)) {
                return; // Don't update if max is less than min
            }
            setPrice({
                min: Number(newPrice.min) || 0,
                max: Number(newPrice.max)
            });
        }, 500),
        [setPrice]
    );

    // Handle price input changes
    const handlePriceChange = (type, value) => {
        const newPrice = {
            ...localPrice,
            [type]: value
        };
        setLocalPrice(newPrice);
        debouncedSetPrice(newPrice);
    };

    const handleCategoryClick = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory('');
            setCategory('');
        } else {
            setSelectedCategory(category);
            setCategory(category);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            {/* Price Filter */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Fiyat Aralığı</h3>
                <div className="flex flex-col gap-3">
                    <div className="relative">
                        <input 
                            type="number" 
                            placeholder="Min ₺"
                            min="0"
                            value={localPrice.min}
                            onChange={e => handlePriceChange('min', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <div className="relative">
                        <input 
                            type="number"
                            placeholder="Max ₺"
                            min="0"
                            value={localPrice.max}
                            onChange={e => handlePriceChange('max', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>
                {Number(localPrice.max) < Number(localPrice.min) && localPrice.max && localPrice.min && (
                    <p className="text-red-500 text-sm mt-2">
                        Maksimum fiyat, minimum fiyattan küçük olamaz
                    </p>
                )}
            </div>

            {/* Category Filter */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Kategoriler</h3>
                <div className="space-y-2">
                    {categoryList.map((category, i) => (
                        <button
                            key={i}
                            onClick={() => handleCategoryClick(category)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                selectedCategory === category
                                    ? 'bg-orange-100 text-orange-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filter;