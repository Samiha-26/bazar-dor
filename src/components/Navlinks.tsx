import NavLinkItem from './NavLinkItem';

interface Navs {
    id: string,
    slug: string,
    nameBn: string,
    icon: string
}

const Navlinks = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data = await res.json();
    const navs:Navs[] = data;

   return (
  <div className="flex w-full items-center gap-6 overflow-x-auto pb-1 text-sm font-medium">
    {navs.map((n) => (
      <NavLinkItem
        key={n.id}
        href={`/category/${n.slug}`}
        icon={n.icon}
        name={n.nameBn}
      />
    ))}
  </div> 
);

};

export default Navlinks;