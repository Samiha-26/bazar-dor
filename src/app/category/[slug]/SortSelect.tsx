"use client";

import { useRouter, usePathname } from "next/navigation";

export default function SortSelect({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <select
      value={currentSort}
      onChange={(e) => router.push(`${pathname}?sort=${e.target.value}`)}
      className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 outline-none focus:border-green-500"
    >
      <option value="default">ডিফল্ট</option>
      <option value="asc">দাম: কম থেকে বেশি</option>
      <option value="desc">দাম: বেশি থেকে কম</option>
    </select>
  );
}
