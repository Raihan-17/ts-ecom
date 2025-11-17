import React from 'react';
import { Link } from 'react-router-dom';

interface BookCardProps {
    id: string;
    title: string;
    image: string;
    price: number;
    thumbnail?: string;
};

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price, thumbnail }) => {
    return (
        <div className='border p-4 rounded'>
            <Link to={`/products/${id}`}>
                <img src={thumbnail || image} alt={title} className='w-full h-48 object-cover mb-4' />
                <h3 className='text-lg font-semibold mb-2'>{title}</h3>
                <p className='text-gray-700 font-bold'>${price}</p>
            </Link>
           
        </div>
    );
};

export default BookCard;