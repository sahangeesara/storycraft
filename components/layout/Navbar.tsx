'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    // Exact match
    if (pathname === path) return true;

    // If there are longer nav links that also match the pathname, prefer those
    const longerMatchExists = navLinks.some(
      (link) => link.href.length > path.length && pathname?.startsWith(link.href)
    );

    // Otherwise, treat parent route as active when on a child route
    if (!longerMatchExists && path !== '/' && pathname?.startsWith(path)) return true;

    return false;
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/home', label: 'Main' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Post' },
    { href: '/blog/articles', label: 'Articles' },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-400">
            StoryCraft
          </Link>
          
          <ul className="flex gap-6">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`px-3 py-2 rounded-md transition-all duration-200 ${
                      active
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
