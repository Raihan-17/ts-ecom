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
    setKeyword,
  } = useFilter();

  interface product {
    category: string;
  }
  interface FetchResponse {
    products: product[];
  }

  const [categories, setCategories] = useState<string[]>([]);
  const keywords: string[] = ["apple", "trend", "watch", "fashion", "shoes", "shirt"];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)));
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
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword('');
  };

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-950 text-white p-4 overflow-y-auto shadow-xl ">
      <h2 className="text-2xl font-bold mb-8 tracking-wide text-center">PAWN SHOP</h2>

      <section>
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mb-4  py-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-300 focus:outline-none focus:bg-gray-600"
        />

        <div className="flex gap-2 mb-6">
          <input
            type="number"
            placeholder="Min Price"
            className="px-2 py-2 w-full rounded bg-gray-700 border border-gray-600 focus:outline-none focus:bg-gray-600"
            onChange={handleMinPriceChange}
            value={minPrice ?? ''}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="px-2 py-2 w-full rounded bg-gray-700 border border-gray-600 focus:outline-none focus:bg-gray-600"
            onChange={handleMaxPriceChange}
            value={maxPrice ?? ''}
          />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2 text-sm">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2"
                onChange={() => handleRadioChangeCategories(category)}
                checked={selectedCategory === category}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </div>

        {/* Keywords */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {keywords.map((word, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-full text-xs transition duration-200 ${
                  keyword === word
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => handleKeywordClick(word)}
              >
                {word.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleResetFilters}
          className="w-full py-2 mt-4 rounded bg-red-600 hover:bg-red-700 transition-all duration-200"
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
