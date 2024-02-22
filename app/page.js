import Banner from "@/components/Banner";
import Products from "@/components/Products";

export default function Home() {
  return (
    <main className="min-h-screen p-4 bg-background">


      <Banner />
      <hr className="my-1 h-px border-0 bg-gray-300" />
      <Products />
    </main>
  );
}
