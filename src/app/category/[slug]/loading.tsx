export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 animate-pulse">
      <div className="mb-4 flex items-center justify-start rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 shrink-0 rounded-full bg-gray-200"></div>
          <div className="flex flex-col gap-2">
            <div className="h-6 w-24 rounded bg-gray-200"></div>
            <div className="h-4 w-64 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-end rounded-xl border border-gray-100 bg-white p-3 px-6 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 rounded bg-gray-200"></div>
          <div className="h-8 w-32 rounded bg-gray-200"></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="h-3 w-40 rounded bg-gray-200"></div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex h-33 flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-200"></div>
              <div className="flex flex-col gap-2">
                <div className="h-5 w-24 rounded bg-gray-200"></div>
                <div className="h-3 w-16 rounded bg-gray-200"></div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="h-6 w-20 rounded bg-gray-200"></div>
              <div className="h-6 w-16 rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
