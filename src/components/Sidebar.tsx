import React, { useEffect, useState } from 'react';
import { useFilter } from './FilterContext.tsx';

const Sidebar = () => {
    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword
    } = useFilter();

interface product {
    category: string;
}  
interface FetchResponse {
    products: product[];
}  

const [categories, setCategories] = useState<string[]>([]);
const [keywords]=useState<string[]>([
    "apple",
    "trend",
    "watch",
    "Fashion",
    "shoes",
    "shirt",
]);

useEffect(()=>{
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data: FetchResponse = await response.json();
            // setCategories(data);
            // console.log(data);
            const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)));
            console.log(uniqueCategories);
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    fetchCategories();
}, []);

const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
};

const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
};

const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
};

const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
}

const handleResetFilters = () => {
   setSearchQuery('');
   setSelectedCategory('');
   setMinPrice(undefined);
   setMaxPrice(undefined);
   setKeyword('');
}

    return (
        <div className='w-64 bg-gray-200 p-5 h-screen'>
            <h2 className='text-xl font-bold mb-10 mt-4'>PAWN SHOP</h2>

        <section>
            <input
                type="text"
                placeholder="Search products..."
                className="border-2 border-gray-400 p-2 rounded w-full sm:mb-0"
            />
<div className='flex my-3 gap-2'>
    <input
        type="text"
        placeholder="min price"
        className="border-2 border-gray-400 p-2 rounded w-full sm:mb-0"
        onChange={handleMinPriceChange}
        value={minPrice ?? ''}
    />
    <input
        type="text"
        placeholder="max price"
        className="border-2 border-gray-400 p-2 rounded w-full sm:mb-0"
        onChange={handleMaxPriceChange}
        value={maxPrice ?? ''}
    />
</div>
        {/* category section */}
        <div className='mb-5'>
            <h3 className='text-lg font-semibold mb-2'>Categories</h3>

           <section>
            {categories.map((category, index)=>(
              <label key={index} className="block mb-1">
                <input type="radio" name="category" 
                value={category} className="mr-2" 
                onChange={() => handleRadioChangeCategories(category)}
                checked={selectedCategory === category}
                />
                {category.toUpperCase()}
              </label>
            ))}
           </section>

           {/* keyword section */}
           <section>
            <h3 className='text-lg font-semibold mb-2'>Keywords</h3>
            <div className='flex flex-wrap gap-2'>
                {keywords.map((keyword, index) => (
                    <span key={index} className='border-2 border-gray-100 p-1 rounded'
                    onClick={() => handleKeywordClick(keyword)}
                    >
                        {keyword.toUpperCase()}
                    </span>
                ))}
            </div>
           </section>

        </div>
        <button 
        onClick={handleResetFilters}
        className='bg-black text-white p-2 rounded'>Reset Filters</button>

        </section>

        </div>
    );
};

export default Sidebar;