import React from 'react';
import { Link } from 'react-router';

interface BookCardProps {
    id: number;
    title: string;
    image: string;
    price: number;
};

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
    return (
        <div className='border p-4 rounded'>
            <Link to={`/products/${id}`}>
                <img src={image} alt={title} className='w-full h-48 object-cover mb-4' />
                <h3 className='text-lg font-semibold mb-2'>{title}</h3>
                <p className='text-gray-700 font-bold'>${price}</p>
            </Link>
           
        </div>
    );
};

export default BookCard;