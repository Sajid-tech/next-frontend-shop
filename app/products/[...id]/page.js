/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';





const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};






const ProductPage = () => {

    const [product, setProduct] = useState(null);
    const params = useParams()
    const { id } = params



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('/api/products'); // Assuming your API endpoint for fetching products is `/api/products`
                // console.log("response:", response)
                const data = response.data;
                // console.log("data:", data)
                const productById = data.product.find(item => item._id === `${id}`);
                // console.log("productById", productById)
                setProduct(productById);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (product) {
        return (
            <section className="mt-20 md:mt-6 ">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Image section */}
                    <div className="lg:aspect-h-2 lg:aspect-w-2 lg:rounded-lg overflow-hidden px-4 md:px-2">
                        <img
                            src={product.images[0]}
                            alt={product.images[0]}
                            className="w-full h-full md:h-[90vh] object-cover object-center border border-primary rounded-lg"
                        />
                    </div>
                    <div className="grid grid-cols-2 lg:grid lg:grid-cols-1 lg:gap-y-4 px-2 gap-2 md:gap-0 md:px-2">
                        {product.images.slice(1, 3).map((image, index) => (
                            <div
                                key={index}
                                className="lg:aspect-h-2 lg:aspect-w-3 lg:overflow-hidden lg:rounded-lg "
                            >
                                <img
                                    src={image}
                                    alt={image}
                                    className="w-full h-full md:h-[44vh] object-cover object-center border rounded-lg border-secondary p-4"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Product info */}
                    <div className="p-4 lg:p-8 border">
                        <h1 className="text-3xl font-semibold text-gray-900">{product.title}</h1>
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-900">Description</h2>
                            <p className="mt-2 text-gray-700">{product.description}</p>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-900">Details</h2>
                            <p className="mt-2 text-gray-700 list-disc list-inside">
                                Details
                            </p>
                        </div>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 my-3">
                            <div>
                                <label className="text-text font-semibold">Brand</label>
                                <p className="mt-2 text-accent list-disc list-inside">
                                    Brand
                                </p>
                            </div>

                            <div>
                                <label className="text-text font-semibold">Gender</label>
                                <p className="mt-2 text-accent list-disc list-inside">
                                    Gender
                                </p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 my-3">
                            <div>
                                <label className="text-text font-semibold">Sizes</label>
                                <p className="mt-2 text-accent list-disc list-inside">
                                    Sizes
                                </p>
                            </div>

                            <div>
                                <label className="text-text font-semibold">Colors</label>
                                <p className="mt-2 text-accent list-disc list-inside">
                                    Colors
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-900">Price</h2>
                            <p className="mt-2 text-primary font-semibold text-lg">
                                Inr {formatPrice(product.price)}
                            </p>
                        </div>
                        <div className="w-full">
                            <button
                                className="bg-primary text-white py-2 px-4 mt-4 rounded-md hover:bg-primary-dark w-full"

                            >
                                Add to Cart
                            </button>
                        </div>




                    </div>
                </div>
            </section>
        );
    }

    return <p>Product not found.</p>;
}

export default ProductPage