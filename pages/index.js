import Banner from "@/components/Banner";
import Collection from "@/components/Collection";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import Products from "@/components/Products";

import Image from "next/image";


export default function Home() {
  return (
    <main className="min-h-screen p-4  bg-background">


      <Banner />
      <hr className="my-1 h-px border-0  bg-sky-200" />
      <Products />
      <hr className="my-1 h-px border-0 bg-sky-200" />
      <Collection />
      <hr className="my-1 h-px border-0 bg-sky-200" />
      <Newsletter />
      <hr className="my-1 h-px border-0 bg-sky-200" />
      <Footer />
    </main>
  );
}
