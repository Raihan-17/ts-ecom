import  { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';
import { Tally3 } from 'lucide-react';
import axios from 'axios';
import BookCard from './BookCard';

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } = useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;
      if (keyword) {
        url = `https://dummyjson.com/products/search?q=${keyword}`;
      }

      try {
        const response = await axios.get(url);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = [...products];

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
    }
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice);
    }
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();
  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    for (let page = 1; page <= totalPages; page++) {
      buttons.push(page);
    }
    return buttons;
  };

  return (
    <section className=" px-5 py-4 relative">
      <div className="flex justify-between items-center mb-6">
        {/* Filter Button */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            <Tally3 /> <span>{filter === "all" ? "Sort by" : filter}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute bg-gray-800 text-white rounded-md shadow-lg mt-2 z-10 w-40 divide-y divide-gray-700">
              <button
                onClick={() => { setFilter("cheap"); setDropdownOpen(false); }}
                className="px-4 py-2 hover:bg-gray-700 w-full text-left"
              >
                Cheap
              </button>
              <button
                onClick={() => { setFilter("popular"); setDropdownOpen(false); }}
                className="px-4 py-2 hover:bg-gray-700 w-full text-left"
              >
                Popular
              </button>
              <button
                onClick={() => { setFilter("expensive"); setDropdownOpen(false); }}
                className="px-4 py-2 hover:bg-gray-700 w-full text-left"
              >
                Expensive
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-b-4 border-gray-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.thumbnail}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-5 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {getPaginationButtons().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-lg border border-gray-600 ${
                currentPage === page ? "bg-gray-700 text-white" : "hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-5 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default MainContent;
