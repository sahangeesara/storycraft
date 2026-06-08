import { getAllArticles } from "@/lib/blog";
import ArticlePreview from "@/components/blog/ArticlePreview";
import Link from "next/link";
import { BlogArticle } from "@/types/blog";
import BlogActions from "@/components/blog/BlogActions";
import { createClient } from "@/lib/supabase-server";
import AdminOnly from "@/components/blog/AdminOnly";
import "../globals.css";
import { redirect } from "next/navigation";

export default async function BlogPage() {
  const articles = await getAllArticles();

  const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  //
  // if (!user) {
  //   redirect("/auth/login");
  // }
  //
  // const { data: profile } = await supabase
  //   .from("profiles")
  //   .select("is_pro")
  //   .eq("id", user.id)
  //   .single();
  //
  // const isPro = profile?.is_pro === true;
  //
  // // If this is NORMAL blog page:
  // if (isPro) {
  //   redirect("/blog/pro");
  // }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            StoryCraft Blog
          </h1>
          <p className="text-lg text-gray-600">
            Insights, tips, and stories about web development and technology
          </p>
        </div>

        <AdminOnly>
          <Link
            href="/blog/create"
            className="mb-6 inline-block px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create New Article
          </Link>
        </AdminOnly>


        <div className="grid gap-8">
          {articles.map((post: BlogArticle) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4 border-blue-600"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold text-gray-900 flex-1">
                  {post.title}
                </h2>
              </div>

              <div className="flex gap-4 text-sm text-gray-600 mb-4">
                <span>
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                <span>•</span>
                <span>By {post.author}</span>
              </div>

              <p className="text-gray-700 mb-4">
                {post.excerpt}
              </p>

              <ArticlePreview article={post} />


              <AdminOnly>
                <BlogActions id={post.id} />
              </AdminOnly>

            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
