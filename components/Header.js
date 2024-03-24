"use client"
import { CartContext } from '@/utils/CartContext'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { RxAvatar } from "react-icons/rx";

const Header = () => {


    const router = useRouter()
    const { pathname } = router;

    const { data: session } = useSession()


    const { cartProducts } = useContext(CartContext)









    return <>


        <header className="bg-white sticky top-0 z-40 w-full px-2 md:px-4">
            <div
                className="mx-auto flex h-16 max-w-screen-2xl items-center gap-8 border-b border-primary border-opacity-40"
            >
                <Link className="flex gap-1 items-center text-text font-medium text-lg hover:text-primary " href="/">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                    </svg>
                    <span> / MyShop</span>

                </Link>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-md">
                            <li>
                                <Link className={`text-accent transition hover:text-accent/75 ${pathname === '/' ? 'text-primary' : ""} `} href="/">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link className={`text-accent transition hover:text-accent/75 ${pathname === ('/products') ? 'text-primary' : ""} `} href="/products">
                                    All Products
                                </Link>
                            </li>




                        </ul>
                    </nav>

                    <div className="flex items-center gap-2 ">

                        {session ? (
                            <Link
                                href={'/account'}
                                className="sm:flex sm:gap-2  border-r border-primary pr-2">
                                <div class="h-9 w-9">

                                    <Image className="h-full w-full rounded-full object-cover object-center" src={session.user.image} alt={session.user.email} width={36} height={36} />

                                </div>
                            </Link>
                        ) : (
                            <div className="sm:flex sm:gap-2 border-r border-primary pr-2">
                                <Link
                                    className=" text-md font-medium text-text  md:flex"
                                    href={'/account'}
                                >
                                    <div className='h-9 w-9'>
                                        <RxAvatar className='h-9 w-9 ' />
                                    </div>
                                </Link>

                            </div>
                        )}

                        <div>
                            <Link href="/cart" className="group -m-2 flex items-center p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>

                                <span className="ml-2 text-md text-primary font-bold group-hover:text-text">{cartProducts.length}</span>
                                <span className="sr-only">items in cart, view bag</span>
                            </Link>
                        </div>



                    </div>
                </div>
            </div>
        </header >

        <header className="md:hidden w-full flex justify-around items-center my-3 border-b fixed top-12 bg-gray-200 z-50">
            <div className="inline-flex gap-8 p-1">
                <Link
                    href={'/'}
                    className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-md text-accent hover:text-gray-700 focus:relative ${pathname === ('/') ? 'text-primary' : ""} `}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>


                    Home
                </Link>

                <Link
                    href={'/products'}
                    className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-md text-accent hover:text-gray-700 focus:relative ${pathname === ('/products') ? 'text-primary' : ""} `}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>


                    Products
                </Link>

                <Link
                    href={'/cart'}
                    className={`inline-flex items-center gap-2 rounded-md  px-4 py-2 text-md   ${pathname === ('/cart') ? 'text-primary' : ""} `}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    Cart

                </Link>
            </div>
        </header>
    </>
}

export default Header