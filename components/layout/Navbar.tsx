"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/subscription", label: "Subcrption" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Post" },
  ];

  const isActive = (path: string) => {
    if (pathname === path) return true;

    const longerMatchExists = navLinks.some(
      (link) =>
        link.href.length > path.length &&
        pathname?.startsWith(link.href)
    );

    if (!longerMatchExists && path !== "/" && pathname?.startsWith(path)) {
      return true;
    }

    return false;
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-400">
          StoryCraft
        </Link>

        {/* Nav Links */}
        <ul className="flex gap-6 items-center">
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-3 py-2 rounded-md transition-all duration-200 ${
                    active
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}

          {/* Login Button (ONLY ONCE) */}
          <li>
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}