/* eslint-disable @next/next/no-img-element */
"use client"
import { CartContext } from '@/utils/CartContext'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

const Header = () => {

    const router = useRouter()
    const { pathname } = router;

    const { data: session } = useSession()


    const { cartProducts } = useContext(CartContext)


    const active = 'text-primary transition hover:text-secondary font-bold'
    const inActive = 'text-gray-500 transition hover:text-gray-500/75 font-medium'
    return <>
        <header className="bg-white border-b  border-primary border-opacity-30  sticky top-0 z-40 w-full  ">
            <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-8 px-4 sm:px-6 lg:px-8 text-xl">
                <Link className="flex gap-1 items-center text-text font-medium text-lg hover:text-primary " href="/">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                    </svg>
                    <span> / MyShop</span>

                </Link>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <Link className={pathname === '/' ? active : inActive} href="/"> Home </Link>
                            </li>

                            <li>
                                <Link className={pathname === '/products' ? active : inActive} href="/products"> All Products </Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4 items-center">
                            {session ? (
                                <Link
                                    href={'/account'}
                                    className="sm:flex sm:gap-2 border-r border-primary pr-4">
                                    <div class="h-9 w-9">
                                        <img class="h-full w-full rounded-full object-cover object-center" src={session.user.image} alt={session.user.email} />
                                    </div>
                                </Link>
                            ) : (
                                <Link
                                    className=" px-4 py-1 text-sm font-medium transition border-r border-primary"
                                    href={'/account'}
                                >
                                    Account
                                </Link>
                            )}

                            <Link
                                className=" group rounded-md  text-sm flex items-center font-medium  transition  p-2 "
                                href="/cart"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <span className='ml-2 text-primary font-bold group-hover:text-text'></span>
                                {cartProducts.length}
                            </Link>
                        </div>

                        <button
                            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    </>
}

export default Header