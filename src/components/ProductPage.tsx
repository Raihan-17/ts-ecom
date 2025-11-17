import  { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  images: string[];
  rating: number;
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Product>(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg text-gray-400 mt-20">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center text-lg text-red-500 mt-20">Product not found</div>;
  }

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <button
        className='mb-5 text-blue-400 hover:text-blue-500 transition'
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className='bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl'>
        <div className='flex flex-col md:flex-row gap-6'>
          
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="overflow-hidden rounded-xl">
              <img
                src={product.thumbnail}
                alt={product.title}
                className='w-full h-80 object-cover rounded-xl hover:scale-105 transition-transform duration-300'
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <h2 className="text-3xl font-semibold text-white mb-3">{product.title}</h2>
            <p className="text-gray-400 mb-5">{product.description}</p>

            <div className="flex gap-6 mb-4">
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold text-lg">
                ${product.price}
              </span>
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-lg">
                ⭐ {product.rating}
              </span>
            </div>

            {/* Add to Cart Button (Optional) */}
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
