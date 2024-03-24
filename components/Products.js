"use client"
import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { CartContext } from '@/utils/CartContext';
import toast from 'react-hot-toast';
import Image from 'next/image';

// Utility function to format price with a comma for thousands
const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Products = () => {

    const { addProduct } = useContext(CartContext)
    const [isLoading, setIsLoading] = useState(true);
    const [getProduct, setGetProduct] = useState([]);



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('/api/products'); // Assuming your API endpoint for fetching products is `/api/products`
                console.log("response:", response)
                const data = response.data;
                console.log("dataof all:", data)

                //sort the product 
                const sortProduct = data.product.slice(0, 5);


                setGetProduct(sortProduct);


            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching products
            }
        };


        fetchProduct();

        // console.log("getset", getProduct)
    }, []);



    if (isLoading) {
        return (
            <div className="bg-gray-200 p-4 rounded-lg mt-10 lg:mt-0">
                <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="bg-white border border-gray-300 rounded-xl shadow">
                            <div className="animate-pulse p-4">
                                <div className="h-40 bg-gray-300 rounded-lg"></div>
                                <div className="mt-4 space-y-2">
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    return (
        <div className="bg-white">
            <div className="mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold tracking-tight text-text">Our Latest Products</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                    {getProduct?.length > 0 && getProduct.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="group block overflow-hidden border border-accent rounded-xl border-opacity-10">
                                <div className="p-1">
                                    <div className="relative h-[300px] sm:h-[300px]">
                                        <Image
                                            src={product.images[0]}
                                            alt=""
                                            layout="fill"
                                            objectFit="cover"
                                            className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity"
                                        />

                                        <Image
                                            src={product.images[1]}
                                            alt=""
                                            layout="fill"
                                            objectFit="cover"
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>

                                    <div className="relative  p-3 border-t">
                                        <Link href={'/products/' + product._id}>
                                            <h3
                                                className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4 truncate"
                                            >
                                                {product.title}
                                            </h3>
                                        </Link>

                                        <div
                                            onClick={() => {
                                                addProduct(product._id)
                                                toast.success("Item added to cart")
                                            }}

                                            className="mt-1.5 flex items-center justify-between text-text">
                                            <p className="tracking-wide text-primary">	&#8377; {formatPrice(product.price)}</p>


                                            <button type="button" className="flex items-center divide-x rounded-lg border border-primary bg-white text-center text-md font-medium text-secondary-700 shadow-sm hover:bg-gray-100">
                                                <div className="flex items-center space-x-2 py-2.5 px-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                    </svg>


                                                    <span>Add</span>
                                                </div>
                                                {/* <div className="py-2.5 px-3">18</div> */}
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products