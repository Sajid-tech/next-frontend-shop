import Banner from "@/components/Banner";
import Collection from "@/components/Collection";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import Products from "@/components/Products";

export default function Home() {
  return (
    <main className="min-h-screen p-4 bg-background">


      <Banner />
      <hr className="my-1 h-px border-0 bg-gray-300" />
      <Products />
      <hr className="my-1 h-px border-0 bg-gray-300" />
      <Collection />
      <hr className="my-1 h-px border-0 bg-gray-300" />
      <Newsletter />
      <hr className="my-1 h-px border-0 bg-gray-300" />
      <Footer />
    </main>
  );
}
