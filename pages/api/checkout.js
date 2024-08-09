import mongooseConnect from "@/lib/mongoose";
import { Order } from "@/models/Order";
import Product from "@/models/Product";
const stripe = require('stripe')(process.env.STRIPE_KEY);


//define the default function for handling requests
export default async function handler(req, res) {

    // check if the request method is not POST
    if (req.method !== 'POST') {
        res.json('Should be a post request'); // respond with a message indicating the request should be post
        return;
    }

    // destructure data fro the request body
    const { email, name, address, city, country, zip, cartProducts } = req.body;

    // connect to mongodb using mongoose
    await mongooseConnect()

    // extract unique product ids from the cart products
    const productIds = cartProducts;
    const uniqueIds = [... new Set(productIds)];

    // retreive information about products from the database using thier IDs
    const productsInfo = await Product.find({ _id: uniqueIds });

    // intialize and array to store line items for the stripes session
    let line_items = [];

    // loop through each unique product id
    for (const productId of uniqueIds) {
        // find product information based on its ids
        const productInfo = productsInfo.find(p => p._id.toString() === productId);


        // calculate the quantity of the products in the cart
        const quantity = productIds.filter(id => id === productId)?.length || 0;


        // if the quantity is greater than 0 and productinfo exists
        if (quantity > 0 && productInfo) {
            // push line item information to the line_items array
            line_items.push(
                {
                    quantity,
                    price_data: {
                        currency: 'INR',
                        product_data: { name: productInfo.title },
                        unit_amount: quantity * productInfo.price * 100,
                    },

                }
            )
        }
    }

    // create a new order document in the database
    const orderDoc = await Order.create({
        line_items,

        email,
        name,
        address,
        city,
        country,
        zip,
        paid: false,
    });


    // create a new stripe checkout session
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        billing_address_collection: 'required',
        success_url: process.env.SUCCESS_URL + '/cart?success=1',
        cancel_url: process.env.SUCCESS_URL + '/cart?canceled=1',
        metadata: { orderId: orderDoc._id.toString(), test: 'ok' }
    });


    // respond with url generated for the stripe checkout session
    res.json({
        url: session.url,
    })
}



