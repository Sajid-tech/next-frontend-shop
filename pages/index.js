import dynamic from "next/dynamic";

const Banner = dynamic(() => import('@/components/Banner'))
const Collection = dynamic(() => import('@/components/Collection'))
const Footer = dynamic(() => import('@/components/Footer'))
const Newsletter = dynamic(() => import('@/components/Newsletter'))
const Products = dynamic(() => import('@/components/Products'))




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
