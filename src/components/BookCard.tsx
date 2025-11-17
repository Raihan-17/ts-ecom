import React from 'react';
import { Link } from 'react-router-dom';

interface BookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  thumbnail?: string;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price, thumbnail }) => {
  return (
    <div
      className="
        bg-gradient-to-b from-gray-800 to-black
        rounded-xl shadow-md hover:shadow-xl transition duration-300
        p-4 flex flex-col justify-between
        w-full h-[300px] max-w-[220px] mx-auto
      "
    >
      <Link to={`/products/${id}`} className="flex flex-col h-full">
        {/* Image */}
        <div className="h-[140px] w-full overflow-hidden rounded-md mb-4">
          <img
            src={thumbnail || image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white truncate mb-2">
          {title}
        </h3>

        {/* Price */}
        <div className="mt-auto">
          <p className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm px-2 py-1 rounded-full font-bold inline-block">
            ${price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
