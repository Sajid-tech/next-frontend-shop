import Header from "@/components/Header";
import Provider from "@/components/Provider";
import "@/styles/globals.css";
import { CartContextProvider } from "@/utils/CartContext";
import { Poppins } from 'next/font/google';
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
