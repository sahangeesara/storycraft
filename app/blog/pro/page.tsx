import ProOnly from "@/components/blog/ProOnly";
import { getAllArticles } from "@/lib/blog";
import { BlogArticle } from "@/types/blog";
import Link from "next/link";
import BlogActions from "@/components/blog/BlogActions";
import AdminOnly from "@/components/blog/AdminOnly";
import ArticlePreview from "@/components/blog/ArticlePreview";
import { Syne } from "next/font/google";
import "../../globals.css";
import {redirect} from "next/navigation";
import { createClient } from "@/lib/supabase-server";

const syne = Syne({
    subsets: ["latin"],
    weight: ["700", "800"],
    variable: "--font-syne",
});

export default async function ProBlogPage() {
    const articles = await getAllArticles();
    const published = articles.filter((a: BlogArticle) => (a as any).status === "published");
    const drafts    = articles.filter((a: BlogArticle) => (a as any).status === "draft");

    const supabase = await createClient();

    const TAG_STYLES: Record<string, string> = {
        Technology:  "bg-indigo-500/10 border-indigo-500/25 text-indigo-400",
        Design:      "bg-pink-500/10   border-pink-500/25   text-pink-400",
        Development: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
        Business:    "bg-amber-500/10  border-amber-500/25  text-amber-400",
        Tutorial:    "bg-sky-500/10    border-sky-500/25    text-sky-400",
    };

    // const {
    //     data: { user },
    // } = await supabase.auth.getUser();
    //
    // if (!user) {
    //     redirect("/auth/login");
    // }
    //
    // const isPro = user.user_metadata?.is_pro === true;
    //
    // if (!isPro) {
    //     redirect("/blog");
    // }
    return (
        <ProOnly>
            <div className={syne.variable}>
                <main className="min-h-screen bg-[#020817] text-slate-100 antialiased relative overflow-hidden">

                    {/* ── Background effects ── */}
                    <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(99,102,241,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="pointer-events-none fixed -top-52 -left-52 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,.15)_0%,transparent_70%)]" />
                    <div className="pointer-events-none fixed -bottom-52 -right-24 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,.1)_0%,transparent_70%)]" />

                    <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">

                        {/* ── Header ── */}
                        <header className="mb-12">
                            <div className="flex items-start justify-between flex-wrap gap-4">
                                <div>
                                    {/* Pro badge */}
                                    <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/40 rounded-full px-3 py-1 mb-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 shadow-[0_0_8px_rgba(99,102,241,.8)]" />
                                        <span className="text-[11px] font-medium text-violet-300 uppercase tracking-widest">Pro Access</span>
                                    </div>
                                    <h1 className="font-[var(--font-syne)] text-4xl md:text-5xl font-extrabold tracking-tight leading-none bg-gradient-to-br from-white via-white to-violet-300 bg-clip-text text-transparent">
                                        Creator Blog Studio
                                    </h1>
                                    <p className="text-slate-500 text-sm font-light mt-2">
                                        Exclusive articles &amp; analytics unlocked for your Pro account.
                                    </p>
                                </div>

                                <AdminOnly>
                                    <Link
                                        href="/blog/create"
                                        className="inline-flex items-center gap-2 bg-gradient-to-br from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-[0_4px_24px_rgba(99,102,241,.35)] hover:shadow-[0_8px_32px_rgba(99,102,241,.5)] hover:-translate-y-0.5 transition-all mt-5"
                                    >
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                                            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                        New Article
                                    </Link>
                                </AdminOnly>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3 mt-8">
                                {[
                                    { label: "Total Articles", value: articles.length,  color: "text-slate-100"  },
                                    { label: "Published",      value: published.length, color: "text-emerald-400" },
                                    { label: "Drafts",         value: drafts.length,    color: "text-indigo-400"  },
                                ].map(({ label, value, color }) => (
                                    <div
                                        key={label}
                                        className="bg-gradient-to-br from-white/[.04] to-white/[.01] border border-white/[.07] rounded-2xl px-5 py-4 hover:border-white/[.14] transition-colors"
                                    >
                                        <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-2">
                                            {label}
                                        </p>
                                        <p className={`text-3xl font-bold font-[var(--font-syne)] ${color}`}>
                                            {value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </header>

                        {/* ── Filter pills ── */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {["All", "Published", "Drafts", "Technology", "Design", "Tutorial"].map((f) => (
                                <button
                                    key={f}
                                    className="px-4 py-1.5 rounded-full text-xs font-medium border border-white/[.07] text-slate-500 hover:bg-indigo-500/15 hover:border-indigo-500/40 hover:text-violet-300 transition-all"
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {/* ── Section divider ── */}
                        <div className="flex items-center gap-3 mb-6">
              <span className="text-[11px] font-medium uppercase tracking-widest text-slate-600 whitespace-nowrap">
                Latest Articles
              </span>
                            <span className="flex-1 h-px bg-white/[.05]" />
                        </div>

                        {/* ── Articles ── */}
                        {articles.length === 0 ? (
                            <div className="text-center py-24">
                                <p className="text-5xl mb-4 opacity-20">✦</p>
                                <p className="text-lg font-semibold text-slate-500">No articles yet</p>
                                <p className="text-sm text-slate-600 mt-1">Create your first one above.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {articles.map((post: BlogArticle) => {
                                    const postAny = post as any;
                                    return (
                                        <article
                                            key={post.id}
                                            className="group bg-gradient-to-br from-white/[.04] to-white/[.015] border border-white/[.07] hover:border-indigo-500/35 rounded-2xl overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,.4)] transition-all duration-300"
                                        >
                                            {/* Cover image */}
                                            {postAny.cover_url ? (
                                                <img
                                                    src={postAny.cover_url}
                                                    alt={post.title}
                                                    className="w-full h-44 object-cover group-hover:brightness-110 transition-all duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-24 bg-gradient-to-br from-indigo-500/10 via-violet-500/[.06] to-transparent flex items-center justify-center border-b border-white/[.04]">
                                                    <span className="text-2xl opacity-15 select-none">✦</span>
                                                </div>
                                            )}

                                            <div className="p-6">

                                                {/* Title + status badge */}
                                                <div className="flex items-start justify-between gap-3 mb-2">
                                                    <h2 className="font-[var(--font-syne)] text-lg font-bold text-slate-100 leading-snug tracking-tight group-hover:text-violet-200 transition-colors flex-1">
                                                        {post.title}
                                                    </h2>
                                                    {postAny.status && (
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest shrink-0 border ${
                                                            postAny.status === "published"
                                                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                                                : "bg-white/[.04] border-white/10 text-slate-500"
                                                        }`}>
                              <span className={`w-1 h-1 rounded-full ${
                                  postAny.status === "published"
                                      ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,.8)]"
                                      : "bg-slate-500"
                              }`} />
                                                            {postAny.status}
                            </span>
                                                    )}
                                                </div>

                                                {/* Meta */}
                                                <div className="flex items-center gap-2 text-xs text-slate-600 mb-3">
                                                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                                    <span className="opacity-40">•</span>
                                                    <span>By {post.author}</span>
                                                </div>

                                                {/* Tags */}
                                                {postAny.tags && postAny.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                                        {postAny.tags.map((tag: string) => (
                                                            <span
                                                                key={tag}
                                                                className={`text-[10px] font-medium px-2.5 py-1 rounded-full border uppercase tracking-wider ${
                                                                    TAG_STYLES[tag] ?? "bg-white/[.04] border-white/10 text-slate-400"
                                                                }`}
                                                            >
                                {tag}
                              </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Excerpt */}
                                                <p className="text-sm text-slate-500 font-light leading-relaxed mb-4">
                                                    {post.excerpt}
                                                </p>

                                                <ArticlePreview article={post} />

                                                {/* Footer */}
                                                <div className="flex items-center justify-between pt-4 border-t border-white/[.05] mt-4">
                          <span className="text-xs font-medium text-indigo-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read article →
                          </span>
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
