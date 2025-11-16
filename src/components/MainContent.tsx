import React, { use, useEffect, useState } from 'react';
import { useFilter } from './FilterContext';
import { Tally3 } from 'lucide-react';
import axios from 'axios';
import BookCard from './BookCard';

const MainContent = () => {

const {searchQuery, selectedCategory, minPrice, maxPrice, keyword} = useFilter();

const [products, setProducts] = useState<any[]>([]);
const [filter, setFilter] = useState("all");
const [currentPage, setCurrentPage] = useState(1);
const [dropdownOpen, setDropdownOpen] = useState(false);
const itemsPerPage = 10;

useEffect(() => {
   let url=`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage-1)*itemsPerPage}`;
   
   if(keyword){
    url =`https://dummyjson.com/products/search?q=${keyword}`;

    axios.get(url)
    .then((response) => {
      setProducts(response.data.products);
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
    });
   }
},[currentPage,keyword]);


const getFilteredProducts = () => {
    let filteredProducts = products;

    if(selectedCategory){
        filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
        console.log(filteredProducts);
    }
    if (minPrice !== undefined){
        filteredProducts = filteredProducts.filter((product) => product.price >= minPrice);
    };
    if (maxPrice !== undefined){
        filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice);
    };
    if(searchQuery){
        filteredProducts = filteredProducts.filter((product) => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) 
        );
    };

    switch(filter){
        case "cheap":
            return filteredProducts.sort((a,b) => a.price - b.price);
        case "expensive":
            return filteredProducts.sort((a,b) => b.price - a.price);
        case "popular":
            return filteredProducts.sort((a,b) => b.rating - a.rating);
        default:
            return filteredProducts;    
    };

};
  const filteredProducts = getFilteredProducts();
//   console.log(filteredProducts);

    return (
        <section className="xl:w-[55rem] lg:w-[50rem] md:w-[40rem] sm:w-[30rem] w-full 2xl:pl-8 xl:pl-6 lg:pl-4 md:pl-2 sm:pl-1 pl-0">
            <div className='mb-4'>
                <div className='flex flex-col sm:flex-row justify-between items-center'>
                    <div className='relative mb-5 mt-5'>
                        <button className='border p-4 py-1 rounded-full flex items-center'>
                            <Tally3 className='mr-2'></Tally3>
                         {filter === "all" ? "Filter": filter.charAt(0).toUpperCase() + filter.slice(1)}   
                        </button>

        {dropdownOpen && (
          <div className='absolute bg-white border rounded-md mt-2 sm:w-40 w-full'>
            <button onClick={() => {setFilter("cheap")}} className='block w-full text-left px-4 py-2 hover:bg-gray-100'>
                Cheap
            </button>
            <button onClick={() => {setFilter("popular")}} className='block w-full text-left px-4 py-2 hover:bg-gray-100'>
                Popular
            </button>
            <button onClick={() => {setFilter("expensive")}} className='block w-full text-left px-4 py-2 hover:bg-gray-100'>
                Expensive
            </button>
        
          </div>  
        )}
                            

                    </div>

                </div>

<div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4'>
    {filteredProducts.map((product) => (
        <BookCard key={product.id} 
        id={product.id}
        title={product.title}
        // description={product.description}
        price={product.price}
       image={product.thumbnail}
        />
    ))}
</div>

            </div>

        </section>
    );
};

export default MainContent;