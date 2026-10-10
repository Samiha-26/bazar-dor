import Link from 'next/link';
interface Navs {
    id: string,
    slug: string,
    nameBn: string,
    icon: string
}

const Navlinks = async() => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
    const data = await res.json();
    console.log(data);
    const navs:Navs[] = data;

   return (
  <div className="flex w-full items-center gap-6 overflow-x-auto pb-1 text-sm font-medium font-semibold">
    {navs.map((n) => (
      <Link
        key={n.id}
        href={`/category/${n.slug}`}
        className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-gray-700 hover:bg-green-700 hover:text-white p-2 rounded-[5px]"
      >
        <span className="text-base">{n.icon}</span>
        <span>{n.nameBn}</span>
      </Link>
    ))}
  </div> 
);

};

export default Navlinks;