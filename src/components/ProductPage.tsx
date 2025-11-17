import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios'; // Add this import

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;     // Update this
  images: string[];      // Optional: if you want to build a gallery
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get<Product>(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-5 w-[60%] mx-auto'>
      <button className='mb-4 text-blue-500' onClick={() => navigate(-1)}>
        ← Back
      </button>

      <img src={product.thumbnail} alt={product.title} className='w-[50%] h-auto mb-5' /> {/* Updated */}
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <p className="my-3 text-gray-700">{product.description}</p>
     <div className='flex gap-10 mt-5'>
         <p className="text-xl font-semibold">Price: ${product.price}</p>
         <p className="text-xl font-semibold">Rating: {product.rating}</p>
     </div>
    </div>
  );
};

export default ProductPage;
