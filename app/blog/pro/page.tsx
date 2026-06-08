import ProOnly from "@/components/blog/ProOnly";
import { getAllArticles } from "@/lib/blog";
import { BlogArticle } from "@/types/blog";
import Link from "next/link";
import BlogActions from "@/components/blog/BlogActions";
import AdminOnly from "@/components/blog/AdminOnly";
import ArticlePreview from "@/components/blog/ArticlePreview";
import { Syne } from "next/font/google";
import "../../globals.css";

const syne = Syne({
    subsets: ["latin"],
    weight: ["700", "800"],
    variable: "--font-syne",
});

export default async function ProBlogPage() {
    const articles = await getAllArticles();

    const published = articles.filter(
        (a: BlogArticle) => (a as any).status === "published"
    );

    const drafts = articles.filter(
        (a: BlogArticle) => (a as any).status === "draft"
    );

    const TAG_STYLES: Record<string, string> = {
        Technology: "bg-indigo-500/10 border-indigo-500/25 text-indigo-400",
        Design: "bg-pink-500/10 border-pink-500/25 text-pink-400",
        Development: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
        Business: "bg-amber-500/10 border-amber-500/25 text-amber-400",
        Tutorial: "bg-sky-500/10 border-sky-500/25 text-sky-400",
    };

    return (
        <ProOnly>
            <div className={syne.variable}>
                <main className="min-h-screen bg-[#020817] text-slate-100 antialiased relative overflow-hidden">

                    {/* Background */}
                    <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(99,102,241,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="pointer-events-none fixed -top-52 -left-52 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,.15)_0%,transparent_70%)]" />
                    <div className="pointer-events-none fixed -bottom-52 -right-24 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,.1)_0%,transparent_70%)]" />

                    <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">

                        <header className="mb-12">
                            <div className="flex items-start justify-between flex-wrap gap-4">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/40 rounded-full px-3 py-1 mb-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400" />
                                        <span className="text-[11px] font-medium text-violet-300 uppercase tracking-widest">
                      Pro Access
                    </span>
                                    </div>

                                    <h1 className="font-[var(--font-syne)] text-4xl md:text-5xl font-extrabold tracking-tight">
                                        Creator Blog Studio
                                    </h1>

                                    <p className="text-slate-500 text-sm mt-2">
                                        Exclusive articles & analytics unlocked for your Pro account.
                                    </p>
                                </div>

                                <AdminOnly>
                                    <Link
                                        href="/blog/create"
                                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl"
                                    >
                                        New Article
                                    </Link>
                                </AdminOnly>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mt-8">
                                <div className="rounded-2xl border border-white/10 p-4">
                                    <p className="text-xs text-slate-500">Total Articles</p>
                                    <p className="text-3xl font-bold">{articles.length}</p>
                                </div>

                                <div className="rounded-2xl border border-white/10 p-4">
                                    <p className="text-xs text-slate-500">Published</p>
                                    <p className="text-3xl font-bold text-emerald-400">
                                        {published.length}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/10 p-4">
                                    <p className="text-xs text-slate-500">Drafts</p>
                                    <p className="text-3xl font-bold text-indigo-400">
                                        {drafts.length}
                                    </p>
                                </div>
                            </div>
                        </header>

                        {articles.length === 0 ? (
                            <div className="text-center py-24">
                                <p className="text-lg text-slate-500">No articles yet</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {articles.map((post: BlogArticle) => {
                                    const postAny = post as any;

                                    return (
                                        <article
                                            key={post.id}
                                            className="border border-white/10 rounded-2xl overflow-hidden"
                                        >
                                            <div className="p-6">

                                                <h2 className="text-xl font-bold mb-2">
                                                    {post.title}
                                                </h2>

                                                <div className="text-xs text-slate-500 mb-3">
                                                    {new Date(post.created_at).toLocaleDateString()}
                                                </div>

                                                {postAny.tags?.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {postAny.tags.map((tag: string) => (
                                                            <span
                                                                key={tag}
                                                                className={`px-2 py-1 rounded-full text-xs ${
                                                                    TAG_STYLES[tag] ??
                                                                    "bg-white/10 text-slate-400"
                                                                }`}
                                                            >
                                {tag}
                              </span>
                                                        ))}
                                                    </div>
                                                )}

                                                <p className="text-slate-400 mb-4">
                                                    {post.excerpt}
                                                </p>

                                                <ArticlePreview article={post} />

                                                <div className="flex justify-between items-center mt-4">
                         
                                                    <AdminOnly>
                                                        <BlogActions id={post.id} />
                                                    </AdminOnly>
                                                </div>

                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </ProOnly>
    );
}
