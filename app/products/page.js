"use client"
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";



// Utility function to format price with a comma for thousands
const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Products = () => {




    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [getProduct, setGetProduct] = useState([]);



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('/api/products'); // Assuming your API endpoint for fetching products is `/api/products`
                console.log("response product page:", response)
                const data = response.data;
                console.log("data product page:", data)


                setGetProduct(data.product);


            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };


        fetchProduct();
        // console.log("getset", getProduct)
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);


    // const filterProducts = () => {
    //     if (searchQuery === "") {
    //         setGetProduct(data.product);
    //     } else {
    //         const lowerCaseQuery = searchQuery.toLowerCase();
    //         const filtered = data.product.filter((product) =>
    //             product.title.toLowerCase().includes(lowerCaseQuery)
    //         );
    //         setGetProduct(filtered);
    //     }
    // };

    // useEffect(() => {
    //     filterProducts();
    // }, [searchQuery]);



    return (
        <div className="flex justify-center min-h-screen w-full">
            {loading ? (
                <div className="flex justify-center items-center min-h-screen w-full">
                    <Spinner />
                </div>
            ) : (
                <div className="mt-14 md:mt-6 w-full px-4 md:p-0">
                    <input
                        type="text"
                        placeholder="Search products"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mb-4 px-4 py-2 rounded-lg border border-gray-300 w-full" // Increased the input size
                    />

                    {getProduct.length === 0 ? ( // Display a message when no matching searches
                        <p className="text-center text-gray-600">
                            No matching products found.
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 gap-x-3 md:gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 xl:gap-x-8 px-2">
                            {getProduct.map((product) => (
                                <div key={product._id}>
                                    <div className="group block overflow-hidden border border-accent rounded-xl border-opacity-10">
                                        <div className="">
                                            <div className="relative md:h-[300px] h-[200px]">
                                                <img
                                                    src={product.images[0]}
                                                    alt=""
                                                    className="absolute inset-0 h-full w-full object-contain opacity-100 group-hover:opacity-0"
                                                />
                                                <img
                                                    src={product.images[1]}
                                                    alt=""
                                                    className="absolute inset-0 h-full w-full object-contain opacity-0 group-hover:opacity-100"
                                                />
                                            </div>

                                            <div className="relative p-3 border-t">
                                                <Link href="/">
                                                    <h3 className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4 truncate">
                                                        {product.title}
                                                    </h3>
                                                </Link>

                                                <div className="mt-1.5 flex flex-col items-center justify-between text-text">
                                                    <p className="tracking-wide text-primary text-sm md:text-md">
                                                        &#8377; {formatPrice(product.price)}
                                                    </p>

                                                    <div className="col-span-12 text-center w-full mt-3">
                                                        <button className="disabled block rounded bg-secondary px-5 py-3 text-md text-text w-full transition hover:bg-purple-300"
                                                        >
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Products