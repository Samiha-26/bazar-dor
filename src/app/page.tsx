import TopRisers from "@/components/TopRisers";
import TopFallers from "@/components/TopFallers";
import AllProducts from "@/components/AllProducts";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 pb-12">
      <TopRisers />
      <TopFallers />
      <AllProducts />
    </div>
  );
}
