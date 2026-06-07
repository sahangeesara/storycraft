import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllArticles } from '@/lib/blog';

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function BlogArticlePage({
                                                params,
                                              }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const allArticles = await getAllArticles();

  const relatedArticles = allArticles
      .filter((a) => a.id !== article.id)
      .slice(0, 3);

  const currentIndex = allArticles.findIndex(
      (a) => a.id === article.id
  );

  const prev =
      currentIndex > 0
          ? {
            slug: allArticles[currentIndex - 1].slug,
            title: allArticles[currentIndex - 1].title,
          }
          : null;

  const next =
      currentIndex < allArticles.length - 1
          ? {
            slug: allArticles[currentIndex + 1].slug,
            title: allArticles[currentIndex + 1].title,
          }
          : null;

  return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">

          <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-800 font-semibold mb-8 inline-block"
          >
            ← Back to Blog
          </Link>

          <article className="bg-white rounded-lg shadow-lg p-8 mb-8">

            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {article.category}
              </span>
                <span className="text-gray-600 text-sm">
                {article.read_time}
              </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>

              <div className="flex gap-6 text-sm text-gray-600 mb-6 border-b pb-6">
                <div>
                  <p className="font-semibold text-gray-900">
                    {article.author}
                  </p>
                  <p>Author</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    {new Date(article.created_at).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                    )}
                  </p>
                  <p>Published</p>
                </div>
              </div>
            </header>

            <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>

            <div className="mt-12 pt-8 border-t">
              <p className="font-semibold mb-4">
                Share this article:
              </p>

              <div className="flex gap-4">
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        article.title
                    )}`}
                    className="bg-blue-400 text-white px-4 py-2 rounded"
                >
                  Twitter
                </a>

                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://storycraft.com/blog/${article.slug}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Facebook
                </a>
              </div>
            </div>
          </article>

          {relatedArticles.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold mb-6">
                  Related Articles
                </h2>

                <div className="grid gap-4">
                  {relatedArticles.map((related) => (
                      <Link
                          key={related.id}
                          href={`/blog/${related.slug}`}
                          className="p-4 bg-white rounded shadow hover:shadow-lg"
                      >
                        {related.title}
                      </Link>
                  ))}
                </div>
              </section>
          )}
        </div>
      </main>
  );
}
