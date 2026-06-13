import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              StoryCraft
            </h2>
            <p className="mt-4 text-sm leading-6">
              Craft stories, share ideas, and inspire readers
              around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition"
                >
                  Posts
                </Link>
              </li>

              {/* <li>
                <Link
                  href="/subscription"
                  className="hover:text-white transition"
                >
                  Subcription
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Account
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/auth/login"
                  className="hover:text-white transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/auth/register"
                  className="hover:text-white transition"
                >
                  Register
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-white transition"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Connect
            </h3>

            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Facebook
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Twitter / X
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Instagram
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} StoryCraft. All rights reserved.
          </p>

          <div className="flex gap-4 mt-4 md:mt-0 text-sm">
            <Link
              href="/privacy"
              className="hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}