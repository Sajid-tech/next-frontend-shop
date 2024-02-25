import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t border-gray-200">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
                    <div className="flex items-center justify-center mb-4 lg:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary mr-2">
                            <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
                            <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-lg font-semibold text-gray-800">My Shop</span>
                    </div>

                    <div className="flex items-center">
                        <p className="text-sm text-center text-gray-500 lg:text-right mr-4">
                            &copy; {new Date().getFullYear()} My Shop. All rights reserved.
                        </p>
                        <a href="https://github.com/Sajid-tech" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-700 transition duration-300">
                            @Sajid Hussain
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
