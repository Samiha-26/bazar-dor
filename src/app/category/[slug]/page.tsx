import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import SortSelect from "./SortSelect";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );
  const data: Product[] = await res.json();
  const products = data.filter((p) => p.category === slug);

  if (products.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center py-32 px-4 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">৪০৪</h1>
        <h2 className="mb-6 text-xl font-medium text-gray-600">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
        </h2>
        <Link
          href="/"
          className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const categoryName = products[0].categoryNameBn;
  const categoryIcon = products[0].categoryIcon;

  if (sort === "asc") {
    products.sort((a, b) => a.today - b.today);
  } else if (sort === "desc") {
    products.sort((a, b) => b.today - a.today);
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="mb-4 flex items-center justify-start rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-50 text-3xl">
            {categoryIcon}
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900">{categoryName}</h1>
            <p className="text-sm text-gray-500">
              প্রতি সপ্তাহে নিত্যপ্রয়োজনীয় {categoryName} ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-end rounded-xl bg-white p-3 px-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">সাজান:</span>
          <SortSelect currentSort={sort || "default"} />
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
