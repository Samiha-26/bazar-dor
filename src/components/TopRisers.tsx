import ProductCard from "./ProductCard";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export default async function TopRisers() {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  const data = await res.json();
  const products: Product[] = data;

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[1.3rem] font-bold text-gray-900">
          <span className="text-red-600 text-xs mt-1">▲</span> আজ দাম বেড়েছে
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {risers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
