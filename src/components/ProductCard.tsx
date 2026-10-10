import Link from "next/link";

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

const toBengaliNumber = (number: string | number) => {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return number
    .toString()
    .replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit)]);
};

export default function ProductCard({ product }: { product: Product }) {
  const { slug, image, nameBn, unit, today, change } = product;

  return (
    <Link
      href={`/product/${slug}`}
      className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-50 text-2xl">
          {image}
        </div>
        <div className="flex flex-col">
          <h3 className="text-base font-bold text-gray-900">{nameBn}</h3>
          <p className="text-xs text-gray-500">প্রতি {unit}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-1 text-xs text-gray-500">আজকের দাম</p>
        <div className="flex items-end justify-between">
          <p className="text-xl font-bold text-gray-900">
            {toBengaliNumber(today)}{" "}
            <span className="text-sm font-normal text-gray-600">টাকা</span>
          </p>

          {change.dir === "up" && (
            <span className="flex items-center gap-1 rounded bg-red-50 px-2 py-1 text-[11px] font-bold text-red-600">
              <span className="text-[10px]">▲</span> {toBengaliNumber(change.pct)}%
            </span>
          )}
          {change.dir === "down" && (
            <span className="flex items-center gap-1 rounded bg-green-50 px-2 py-1 text-[11px] font-bold text-green-700">
              <span className="text-[10px]">▼</span> {toBengaliNumber(Math.abs(change.pct))}%
            </span>
          )}
          {change.dir === "flat" && (
            <span className="flex items-center gap-1 rounded bg-gray-50 px-2 py-1 text-[11px] font-bold text-gray-500">
              — {toBengaliNumber(change.pct)}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
