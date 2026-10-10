import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center py-32 px-4 text-center">
      <h1 className="mb-2 text-5xl font-bold text-gray-900">৪০৪</h1>
      <h2 className="mb-6 text-xl font-medium text-gray-600">
        দুঃখিত, আপনি যে পাতাটি খুঁজছেন তা পাওয়া যায়নি।
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
