"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;

      setUser(u);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsOpen(false);
    router.push("/auth/login");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/subscription", label: "Subscription" },
    { href: "/about", label: "About" },
    {
      href: "/blog",
      label: "Post",
    },
  ];

  const isActive = (path: string) => {
    if (pathname === path) return true;

    const longerMatchExists = navLinks.some(
        (link) =>
            link.href.length > path.length &&
            pathname?.startsWith(link.href)
    );

    return (
        !longerMatchExists &&
        path !== "/" &&
        pathname?.startsWith(path)
    );
  };

  return (
      <nav className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-blue-400">
              StoryCraft
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(({ href, label }) => (
                  <Link
                      key={href}
                      href={href}
                      className={`px-3 py-2 rounded-md transition ${
                          isActive(href)
                              ? "bg-blue-600 text-white font-semibold"
                              : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                  >
                    {label}
                  </Link>
              ))}

              {user ? (
                  <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                  >
                    Logout
                  </button>
              ) : (
                  <Link
                      href="/auth/login"
                      className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Login
                  </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                {isOpen ? (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                ) : (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
              <div className="md:hidden pb-4">
                <div className="flex flex-col gap-2">
                  {navLinks.map(({ href, label }) => (
                      <Link
                          key={href}
                          href={href}
                          onClick={() => setIsOpen(false)}
                          className={`px-3 py-2 rounded-md ${
                              isActive(href)
                                  ? "bg-blue-600"
                                  : "hover:bg-gray-800"
                          }`}
                      >
                        {label}
                      </Link>
                  ))}

                  {user ? (
                      <button
                          onClick={handleLogout}
                          className="px-3 py-2 bg-red-600 rounded text-center"
                      >
                        Logout
                      </button>
                  ) : (
                      <Link
                          href="/auth/login"
                          onClick={() => setIsOpen(false)}
                          className="px-3 py-2 bg-blue-600 rounded text-center"
                      >
                        Login
                      </Link>
                  )}
                </div>
              </div>
          )}
        </div>
      </nav>
  );
}
