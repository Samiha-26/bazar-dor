export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-[350px] w-full bg-gray-100 rounded-2xl mb-12"></div>
      
      <div className="flex flex-col gap-12 pb-12">
        {/* Top Risers Section */}
        <div>
          <div className="h-8 w-48 bg-gray-100 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[132px] bg-gray-100 rounded-xl w-full border border-gray-50"></div>
            ))}
          </div>
        </div>

        {/* Top Fallers Section */}
        <div>
          <div className="h-8 w-48 bg-gray-100 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[132px] bg-gray-100 rounded-xl w-full border border-gray-50"></div>
            ))}
          </div>
        </div>

        {/* All Products Section */}
        <div>
          <div className="h-8 w-32 bg-gray-100 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-100 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-[132px] bg-gray-100 rounded-xl w-full border border-gray-50"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
