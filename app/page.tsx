import Link from "next/link";
import "./globals.css";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-black to-gray-800 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            StoryCraft
          </h1>

          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Craft stories, share ideas, and inspire readers
            around the world.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/blog/create"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold"
            >
              Start Writing
            </Link>

            <Link
              href="/blog"
              className="border border-white px-6 py-3 rounded-lg"
            >
              Explore Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why StoryCraft?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 shadow rounded-lg">
              <h3 className="font-bold mb-2">
                ✍️ Easy Writing
              </h3>
              <p>Focus on writing without distractions.</p>
            </div>

            <div className="p-6 shadow rounded-lg">
              <h3 className="font-bold mb-2">
                📚 Discover Stories
              </h3>
              <p>Read stories from writers worldwide.</p>
            </div>

            <div className="p-6 shadow rounded-lg">
              <h3 className="font-bold mb-2">
                🌎 Share Worldwide
              </h3>
              <p>Publish and reach a global audience.</p>
            </div>

            <div className="p-6 shadow rounded-lg">
              <h3 className="font-bold mb-2">
                💬 Community
              </h3>
              <p>Connect with readers and writers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to tell your story?
          </h2>

          <p className="mb-8">
            Join StoryCraft and start publishing today.
          </p>

          <Link
            href="/auth/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Create Account
          </Link>
        </div>
      </section>
    </main>
  );
}
