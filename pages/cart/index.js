/* eslint-disable @next/next/no-img-element */
"use client"
import Spinner from '@/components/Spinner';
import Success from '@/components/Success';
import { CartContext } from '@/utils/CartContext';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';


const Cart = () => {

    const { cartProducts, removeProduct, addProduct, clearCart } = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');
    const { data: session } = useSession()
    const [isSuccess, setIsSuccess] = useState(false)
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        setLoading(true);
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts })
                .then(response => {
                    setProducts(response.data);
                    setLoading(false);

                })
        } else {
            setProducts([]);
            setLoading(false);

        }
    }, [cartProducts]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window?.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();

        }
    }, [clearCart]);




    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }



    function increaseProduct(id) {
        addProduct(id);
    }

    function decreaseProduct(id) {
        removeProduct(id);
        toast.success('Removed product!!')
    }
    function deleteCart(id) {
        clearCart();
        toast.success('Cart cleared!!')
    }

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    //checkout 

    async function stripeCheckout() {
        const response = await axios.post('/api/checkout', {
            email: session.user.email, name: session.user.name, address, country, zip, city, cartProducts
        })

        if (response.data.url) {
            window.location = response.data.url
        } else {
            toast.error('An error occured!')
        }
    }

    if (isSuccess) {
        return <>
            <Success />
        </>
    }




    if (session) {
        return (
            <section className="flex justify-between max-md:flex-col space-x-4 mt-8 md:mt-8  lg:mt-0">
                <div className=" md:w-2/3 px-6  lg:px-16">
                    <div className='mt-6  md:mt-6 ' >
                        <header className="text-center  flex justify-between w-full">
                            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart Items</h1>
                        </header>
                        {loading ? (
                            <div className="flex justify-center items-center ">
                                <Spinner />
                            </div>
                        ) : (
                            <>
                                {products.length === 0 ? (
                                    <p className="text-center text-gray-600 mt-8">Your cart is empty</p>
                                ) : (
                                    <ul className="space-y-8 mt-8">
                                        {products.map(product => (
                                            <li key={product._id} className="flex items-center gap-4">
                                                <img
                                                    src={product.images[0]}
                                                    alt={"cart image"}
                                                    className="w-16 h-16 rounded object-cover"
                                                />
                                                <div>
                                                    <h3 className="text-sm text-gray-900">{product.title}</h3>
                                                    <p className="text-xs text-gray-600">Price: Inr {formatPrice(product.price)}</p>
                                                    <div className="flex items-center mt-2">
                                                        <button
                                                            onClick={() => decreaseProduct(product._id)}
                                                            className="text-gray-600 hover:text-red-600"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                                            </svg>
                                                        </button>
                                                        <p className="mx-2">{cartProducts.filter(id => id === product._id).length}</p>
                                                        <button
                                                            onClick={() => increaseProduct(product._id)}
                                                            className="text-gray-600 hover:text-red-600"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="flex justify-between items-center mt-8 border-t pt-4">
                                    <button onClick={deleteCart} className="text-red-500 hover:text-red-700 focus:outline-none">Clear Cart</button>
                                    <div>
                                        <p>Subtotal: &#8377; {formatPrice(total)}</p>
                                        <strike>VAT: &#8377; {formatPrice(total / 1000)}</strike>
                                        <p className="font-bold">Total: &#8377; {formatPrice(total)}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-8">
                                    <Link
                                        className="group flex items-center justify-between gap-4 rounded-lg border border-current px-4 py-2 text-sky-600 transition-colors hover:bg-sky-500 focus:outline-none focus:ring active:bg-orange-500"
                                        href="/products"
                                    >
                                        <span className="font-medium transition-colors group-hover:text-white">
                                            Continue shopping
                                        </span>

                                        <span
                                            className="shrink-0 rounded-full border border-sky-600 bg-white p-2 group-active:border-sky-500"
                                        >
                                            <svg
                                                className="h-4 w-4 rtl:rotate-180"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* shipping details */}

                {products.length === 0 ? (
                    ''
                ) : (
                    <div className='md:1/3 mt-16 md:mt-6  pr-8'>
                        <header className="text-start flex-col w-full">
                            <h1 className="text-xl font-bold text-gray-900 ">Shipping Details</h1>
                            <p className="mt-2">We use Your Account details for shipping</p>
                        </header>
                        <div className="mx-auto max-w-xl p-4 border rounded-md shadow-xl h-[400px] my-3  ">
                            <div className="space-y-5">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className='col-span-6'>

                                        <label className="mb-1 block text-sm font-medium text-text">Email</label>
                                        <input type="email" name="email" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                            placeholder='Email' value={session?.user?.email}
                                        />
                                    </div>
                                    <div className="col-span-6">
                                        <label className="mb-1 block text-sm font-medium text-text">Full Name</label>
                                        <input type="text" name="name" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                            placeholder='Full name'
                                            value={session?.user?.name}
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <label className="mb-1 block text-sm font-medium text-text">Address</label>
                                        <input type="text" name="address" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="Newtown, Kolkata"
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                            required
                                        />

                                    </div>
                                    <div className="col-span-4">
                                        <label className="mb-1 block text-sm font-medium text-text">City</label>
                                        <input type="text" name="city" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder=""
                                            value={city}
                                            onChange={e => { setCity(e.target.value) }}
                                            required
                                        />
                                    </div>
                                    <div className="col-span-5">
                                        <label className="mb-1 block text-sm font-medium text-text">State</label>
                                        <input type="text" name="state" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder=""
                                            value={country}
                                            onChange={e => { setCountry(e.target.value) }}
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <label className="mb-1 block text-sm font-medium text-text">Zip</label>
                                        <input type="text" name="zip" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder=""
                                            value={zip}
                                            onChange={e => { setZip(e.target.value) }}
                                        />
                                    </div>
                                    <div className="col-span-12 text-center w-full">
                                        <button
                                            onClick={stripeCheckout}

                                            className="disabled block rounded bg-secondary px-5 py-3 text-md text-text transition hover:bg-purple-300 w-full"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </section>
        );
    }

    return <>
        <div className="grid h-screen px-4 bg-white place-content-center">
            <div className="text-center">

                <p className="mt-4 text-text text-2xl">You should sign Up to view cart Items</p>

                <button
                    onClick={() => signIn('google')}
                    className="inline-block px-5 py-3 mt-6 text-sm font-medium text-text bg-primary rounded hover:bg-primary focus:outline-none focus:ring"
                >
                    Login / Register
                </button>
            </div>
        </div>
    </>
}

export default Cart