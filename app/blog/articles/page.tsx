import articles from '@/lib/articles';
import ArticlePreview from '@/components/blog/ArticlePreview';


export default function ArticlesPage() {
  return (
    <main className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Articles</h1>

        <div className="space-y-4">
          {articles.map((post) => (
            <article key={post.id} className="bg-white p-4 rounded shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-blue-600 text-xl font-semibold flex items-center gap-3">
                      {post.title}
                    <ArticlePreview article={post} />
                  </h2>
                  <p className="text-sm text-gray-600">{post.excerpt}</p>
                </div>
                <div className="text-sm text-gray-500 text-right">
                  <div>{new Date(post.date).toLocaleDateString()}</div>
                  <div>{post.readTime}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

