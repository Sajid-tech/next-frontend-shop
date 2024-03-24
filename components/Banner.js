"use client"
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { CartContext } from '@/utils/CartContext';
import toast from 'react-hot-toast';
import Image from 'next/image';




const Banner = () => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { addProduct } = useContext(CartContext)
    function addItemToCart() {
        addProduct(product._id);
        toast.success("Item added to cart")
    }


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('/api/products'); // Assuming your API endpoint for fetching products is `/api/products`
                // console.log("response:", response)
                const data = response.data;
                // console.log("data:", data)
                const productById = data.product.find(item => item._id === '65d5cfa38fe4c5f8dc6f6824');
                // console.log("productById", productById)
                setProduct(productById);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching products
            }
        };

        fetchProduct();
    }, []);




    if (isLoading) {
        // Skeleton Loading UI while data is being fetched
        return (
            <div className="bg-gray-200 p-4 rounded-lg mt-10 lg:mt-0">
                <div className="flex items-center">
                    <div className="ml-4">
                        <div className="animate-pulse w-40 h-4 bg-gray-400 mb-2"></div>
                        <div className="animate-pulse w-32 h-4 bg-gray-400"></div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="animate-pulse w-full h-4 bg-gray-400 mb-2"></div>
                    <div className="animate-pulse w-full h-4 bg-gray-400 mb-2"></div>
                    <div className="animate-pulse w-full h-4 bg-gray-400"></div>
                    <div className="animate-pulse mt-4 w-full h-48 bg-gray-400 rounded-lg"></div>
                </div>
                <div className="mt-4">
                    <div className="animate-pulse w-20 h-4 bg-gray-400"></div>
                </div>
            </div>
        );
    }

    if (product) {
        return <>
            <div className="relative overflow-hidden bg-background my-14 md:my-10">
                <div className="lg:py-40 min-h-[650px]">
                    <div className="relative mx-auto sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-xl text-start">
                            <h1 className="text-4xl sm:text-5xl lg:text-5xl lg:hidden max-md:mb-6 font-bold tracking-tight text-primary">
                                At <span className="text-accent">50%</span> Off
                            </h1>
                            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-text">
                                {product?.title}
                            </h1>
                            <p className="mt-4 line-clamp-3 text-lg sm:text-xl lg:text-2xl text-gray-500">
                                {product?.description}
                            </p>

                            <div className="mt-10 flex flex-col max-sm:items-center max-sm:justify-center">
                                {/* Decorative image grid */}
                                <div className="lg:hidden relative ">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="w-72 h-80 overflow-hidden rounded-lg border border-secondary transform rotate-3 translate-x-4 hover:-rotate-6 hover:translate-x-8 transition-transform duration-300 ease-in-out">

                                            <Image src={product?.images[0]} alt="" width={288} height={320} objectFit="cover" />
                                        </div>
                                        <div className="w-72 h-80 overflow-hidden rounded-lg border border-secondary transform -rotate-2 translate-x-2 hover:rotate-4 hover:translate-x-4 transition-transform duration-300 ease-in-out">

                                            <Image src={product?.images[1]} alt="" width={288} height={320} objectFit="cover" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center max-sm:justify-center max-sm:mt-6">
                                    <button
                                        onClick={addItemToCart}

                                        className="mt-6 inline-block rounded-md border border-transparent bg-primary px-6 py-3 text-center font-medium text-white hover:text-accent" >
                                        Add to cart
                                    </button>
                                    <Link href={"/products"} className="mt-6 inline-block rounded-md  bg-transparent border border-accent px-6 py-3 text-center font-medium text-accent hover:text-primary hover:border-primary">
                                        All Products
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden lg:block absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                <div className="flex items-center space-x-6 lg:space-x-8">
                                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                        <div className="w-72 h-80 overflow-hidden rounded-lg border border-secondary transform rotate-3 translate-x-4 hover:-rotate-6 hover:translate-x-8 transition-transform duration-300 ease-in-out">

                                            <Image src={product?.images[0]} alt="" width={288} height={320} objectFit="cover" />
                                        </div>
                                        <div className="w-72 h-80 overflow-hidden rounded-lg border border-secondary transform -rotate-2 translate-x-2 hover:rotate-4 hover:translate-x-4 transition-transform duration-300 ease-in-out">

                                            <Image src={product?.images[1]} alt="" width={288} height={320} objectFit="cover" />
                                        </div>
                                    </div>
                                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                        <div className="w-72 h-80 overflow-hidden rounded-lg border border-secondary transform rotate-1 translate-x-3 hover:-rotate-2 hover:translate-x-4 transition-transform duration-300 ease-in-out">

                                            <Image src={product?.images[2]} alt="" width={288} height={320} objectFit="cover" />
                                        </div>
                                        <div className="w-72 h-80 overflow-hidden rounded-lg border border-secondary transform -rotate-4 translate-x-2 hover:rotate-8 hover:translate-x-3 transition-transform duration-300 ease-in-out">

                                            <Image src={product?.images[3]} alt="" width={288} height={320} objectFit="cover" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>;
    }
    return null;
}

export default Banner;