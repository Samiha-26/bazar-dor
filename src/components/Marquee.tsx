import Link from "next/link";
import MarqueeFast from "react-fast-marquee";

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

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );

  const data = await res.json();
  const products: Product[] = data;

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
      <MarqueeFast className="py-3" direction="right" speed={70} pauseOnHover>
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/news/${p.slug}`}
            className="mx-3 inline-flex shrink-0 items-center gap-3 whitespace-nowrap text-sm hover:underline font-semibold"
          >
            <span className="text-lg">{p.image}</span>

            <span className="font-medium text-base-content">{p.nameBn}</span>

            <span className="text-base-content/80">
              ৳{p.today} টাকা/{"কেজি"}
            </span>

            {p.change.dir === "up" && (
              <span className="font-semibold text-red-500">
                ▲{p.change.pct}%
              </span>
            )}

            {p.change.dir === "down" && (
              <span className="font-semibold text-green-600">
                ▼{Math.abs(p.change.pct)}%
              </span>
            )}

            {p.change.dir === "flat" && (
              <span className="text-gray-500">—</span>
            )}

            <span className="ml-3 text-base-300">•</span>
          </Link>
        ))}
      </MarqueeFast>
    </div>
  );
};

export default Marquee;