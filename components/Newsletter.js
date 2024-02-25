import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Newsletter = () => {
    return (
        <div className="newsletter-section bg-cover min-h-[400px] bg-center bg-no-repeat flex items-center justify-center  "
            style={{
                backgroundImage: `url('/footer.jpeg') `,

            }}>
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="newsletter-content flex flex-col items-center text-center">
                    <h4 className=" text-2xl font-medium text-sky-700 mb-4">Newsletter</h4>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">Sign up for latest updates and offers</h2>
                    <form className="flex flex-col items-center gap-2 text-gray-700">
                        <input type="email" placeholder="Enter your email address" className="rounded-md px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:border-sky-500" />
                        <button className="rounded-md bg-sky-500 py-3 px-6 text-white font-medium hover:bg-sky-600 focus:outline-none">Subscribe</button>
                    </form>
                    <p className="text-sm text-gray-500 mt-4">We will handle your data with care. See our <Link href="/" className="text-sky-500 hover:underline">Privacy Policy</Link>.</p>
                    <div className="flex items-center gap-4 mt-8">
                        <Link href="/" className="text-gray-600 hover:text-sky-500 transition-colors duration-200">
                            <FaFacebookF size={24} />
                        </Link>
                        <Link href="/" className="text-gray-600 hover:text-sky-500 transition-colors duration-200">
                            <FaTwitter size={24} />
                        </Link>
                        <Link href="/" className="text-gray-600 hover:text-sky-500 transition-colors duration-200">
                            <FaInstagram size={24} />
                        </Link>
                        <Link href="" className="text-gray-600 hover:text-sky-500 transition-colors duration-200">
                            <FaLinkedinIn size={24} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
