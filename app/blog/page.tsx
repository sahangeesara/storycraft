import Link from 'next/link';
import articles from '@/lib/articles';
import ArticlePreview from '@/components/blog/ArticlePreview';
import PreviewLink from '@/components/blog/PreviewLink';
import ClientNavLink from '@/components/ui/ClientNavLink';

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            StoryCraft Blog
          </h1>
          <p className="text-lg text-gray-600">
            Insights, tips, and stories about web development and technology
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8">
          {articles.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4 border-blue-600"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold text-gray-900 flex-1">
                    {post.title}
                </h2>
                <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                  {post.readTime}
                </span>
              </div>

              <div className="flex gap-4 text-sm text-gray-600 mb-4">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>By {post.author}</span>
              </div>

              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-2">
                <ArticlePreview article={post} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

