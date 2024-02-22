#banner.js componnets code

1. fetch the product by index no
   [
   "use client"
   import { useState, useEffect } from 'react';

const Banner = () => {
const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch('/api/products'); // Assuming your API endpoint for fetching a specific product is `/api/products/:id`
                const data = await response.json();

                setProduct(data.product[0]);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, []);

    return (
        <div>
            {product ? (
                <>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>Inr{product.price}</p>


                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

};

export default Banner;
]

2. fetch the product by index but by axios

[
"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const Banner = () => {
const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('/api/products'); // Assuming your API endpoint for fetching products is `/api/products`
                const data = response.data;

                setProduct(data.product[0]);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, []);

    return (
        <div>
            {product ? (
                <>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>axios{product.price}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

};

export default Banner;

]

3. fetch product by product id axios

["use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const Banner = () => {
const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('/api/products'); // Assuming your API endpoint for fetching products is `/api/products`
                console.log("response:", response)
                const data = response.data;
                console.log("data:", data)
                const productById = data.product.find(item => item._id === '65d5cfa38fe4c5f8dc6f6824');
                console.log("productById", productById)
                setProduct(productById);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, []);

    return (
        <div>
            {product ? (
                <>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>axios{product.price}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

};

export default Banner;]
