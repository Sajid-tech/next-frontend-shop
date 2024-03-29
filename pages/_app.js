import Header from "@/components/Header";
import Provider from "@/components/Provider";
import "@/styles/globals.css";
import { CartContextProvider } from "@/utils/CartContext";
import { Poppins } from 'next/font/google';
import Head from "next/head";
import { Toaster } from "react-hot-toast";


const inter = Poppins({
  subsets: ['latin'],
  weight: '500'
});

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <CartContextProvider>
        <main className={`${inter.className}`}>
          <Head>
            <title>My Shop</title>
            <meta
              name="description"
              content="My Shop Website offers seamless browsing of products, complete with a user-friendly cart feature. Secure payments through Stripe ensure hassle-free transactions. Enjoy a personalized experience with login capabilities."></meta>
          </Head>
          <Header />
          <div className="min-h-screen max-w-screen-2xl mx-auto">
            <Component {...pageProps} />
            <Toaster
              position="top-center"
              reverseOrder={false}
            />

          </div>

        </main>
      </CartContextProvider>
    </Provider>


  )
}
