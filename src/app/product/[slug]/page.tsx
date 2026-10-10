import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

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
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?error=unauthorized");
  }

  const { slug } = await params;

  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );
  if (!res.ok) return notFound();

  const data: Product[] = await res.json();
  const product = data.find((p) => p.slug === slug);

  if (!product) {
    return notFound();
  }

  const diff = Math.abs(product.today - product.yesterday);
  const diffText =
    product.change.dir === "up"
      ? `গতকালের তুলনায় আজ দাম বেড়েছে - ${diff.toLocaleString("bn-BD")} টাকা`
      : product.change.dir === "down"
        ? `গতকালের তুলনায় আজ দাম কমেছে - ${diff.toLocaleString("bn-BD")} টাকা`
        : "গতকালের তুলনায় আজ দাম অপরিবর্তিত আছে";

  const lowest = product.markets.reduce((prev, curr) => (prev.min < curr.min ? prev : curr));
  const highest = product.markets.reduce((prev, curr) => (prev.max > curr.max ? prev : curr));

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">

      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">
          হোম
        </Link>
        <span>›</span>
        <span>{product.categoryNameBn}</span>
        <span>›</span>
        <span className="font-medium text-gray-900">{product.nameBn}</span>
      </div>

      <div className="mb-8 flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-gray-100 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-4xl">
            {product.image}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-gray-900">{product.nameBn}</h1>
            <p className="text-sm text-gray-500">
              প্রতি {product.unit} - {product.categoryNameBn}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-700">{diffText}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center rounded-xl bg-gray-50 px-8 py-4 md:mt-0">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {product.today.toLocaleString("bn-BD")}{" "}
            <span className="text-sm font-normal text-gray-600">
              টাকা / {product.unit}
            </span>
          </p>
          <div className="mt-2 flex items-center gap-1 rounded bg-white px-2 py-1 text-xs font-bold shadow-sm">
            {product.change.dir === "up" && (
              <span className="text-red-600">
                ▲ {product.change.pct.toLocaleString("bn-BD")}%
              </span>
            )}
            {product.change.dir === "down" && (
              <span className="text-green-600">
                ▼ {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
              </span>
            )}
            {product.change.dir === "flat" && (
              <span className="text-gray-600">
                — {product.change.pct.toLocaleString("bn-BD")}%
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="mb-4 text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-xl font-bold text-green-600">
              {lowest.min.toLocaleString("bn-BD")} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-500">{lowest.market}</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
            <p className="mt-1 text-xl font-bold text-red-600">
              {highest.max.toLocaleString("bn-BD")} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-500">{highest.market}</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="mt-1 text-xl font-bold text-green-600">
              {product.today.toLocaleString("bn-BD")} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-500">
              প্রতি {product.unit}-গড় হিসাব
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">বাজার</th>
                <th className="px-6 py-4 font-medium">বিভাগ</th>
                <th className="px-6 py-4 font-medium">সর্বনিম্ন</th>
                <th className="px-6 py-4 font-medium">সর্বোচ্চ</th>
                <th className="px-6 py-4 font-medium">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {product.markets.map((m, idx) => {
                const avg = Math.round((m.min + m.max) / 2);
                return (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {m.market}
                    </td>
                    <td className="px-6 py-4">{m.division}</td>
                    <td className="px-6 py-4">
                      {m.min.toLocaleString("bn-BD")} টাকা
                    </td>
                    <td className="px-6 py-4">
                      {m.max.toLocaleString("bn-BD")} টাকা
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {avg.toLocaleString("bn-BD")} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
