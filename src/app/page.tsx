import Hero from "@/components/Hero";
import TopRisers from "@/components/TopRisers";
import TopFallers from "@/components/TopFallers";
import AllProducts from "@/components/AllProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-4 pb-12">
          <TopRisers />
          <TopFallers />
          <AllProducts />
        </div>
      </main>
    </>
  );
}
