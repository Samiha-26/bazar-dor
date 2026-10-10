'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinkItem({ 
  href, 
  icon, 
  name 
}: { 
  href: string; 
  icon: string; 
  name: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap p-2 rounded-lg transition-colors ${
        isActive 
          ? "bg-green-700 text-white font-bold" 
          : "text-gray-700 hover:bg-green-50 hover:text-green-700"
      }`}
    >
      <span className="text-base">{icon}</span>
      <span>{name}</span>
    </Link>
  );
}
