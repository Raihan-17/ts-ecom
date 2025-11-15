import React, { useEffect, useState } from 'react';

const Sidebar = () => {

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
    />
    <input
        type="text"
        placeholder="max price"
        className="border-2 border-gray-400 p-2 rounded w-full sm:mb-0"
    />
</div>
        {/* category section */}
        <div className='mb-5'>
            <h3 className='text-lg font-semibold mb-2'>Categories</h3>
            {/* <ul>
                {categories.map((category, index) => (
                    <li key={index} className='mb-1 cursor-pointer hover:text-blue-500'>
                        {category}
                    </li>
                ))}
            </ul> */}
        </div>

        </section>

        </div>
    );
};

export default Sidebar;