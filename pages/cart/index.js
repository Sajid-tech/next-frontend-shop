"use client"
import { CartContext } from '@/utils/CartContext';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'



// Utility function to format price with a comma for thousands
const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Cart = () => {

    const { cartProducts, removeProduct, addProduct, clearProduct } = useContext(CartContext)
    const [products, setProducts] = useState([])
    console.log("cart product:", cartProducts)
    console.log("products:", products)
    useEffect(() => {

        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts })
                .then(response => {
                    setProducts(response.data);

                })
        } else {
            setProducts([]);

        }
    }, [cartProducts]);

    console.log("products:", products)


    return <>
        <section className="flex justify-between max-md:flex-col space-x-4">
            <div className="md:w-2/3 px-4">
                <div className="mt-16 md:mt-6">
                    <header className="text-center flex justify-between w-full">
                        <h1 className='text-xl font-bold text-gray-900 sm:text-3xl'>
                            your cart
                        </h1>
                    </header>
                    {!products?.length ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <>
                            {products.map(product => (
                                <div key={product._id}>
                                    <h1>{product.title}</h1>
                                </div>
                            ))}
                        </>
                    )}
                </div>






            </div>
            <div className="md:1/3 mt-16 md:mt-6">
                checkout
            </div>
        </section>
    </>
}

export default Cart