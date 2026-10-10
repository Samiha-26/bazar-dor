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

export default async function AllProducts() {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  const data = await res.json();
  const products: Product[] = data;

  return (
    <section id="সব-পণ্য" className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-[1.3rem] font-bold text-gray-900">সব পণ্য</h2>
        <p className="text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
