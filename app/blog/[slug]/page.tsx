// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import articles from '@/lib/articles';
//
// export async function generateStaticParams() {
//   return articles.map((article) => ({ slug: article.slug }));
// }
//
// interface PageProps {
//   params: { slug: string };
// }
//
// export default function BlogArticlePage({ params }: PageProps) {
//   const { slug } = params;
//   const article = articles.find((a) => a.slug === slug);
//
//   if (!article) notFound();
//
//   const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);
//
//   const currentIndex = articles.findIndex((a) => a.id === article.id);
//   const prev = currentIndex > 0 ? { slug: articles[currentIndex - 1].slug, title: articles[currentIndex - 1].title } : null;
//   const next = currentIndex >= 0 && currentIndex < articles.length - 1 ? { slug: articles[currentIndex + 1].slug, title: articles[currentIndex + 1].title } : null;
//
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
//       <div className="max-w-3xl mx-auto">
//           <Link
//           href="/blog"
//           className="text-blue-600 hover:text-blue-800 font-semibold mb-8 inline-block transition-colors duration-200"
//         >
//           ← Back to Blog
//         </Link>
//
//         <article className="bg-white rounded-lg shadow-lg p-8 mb-8">
//           <header className="mb-8">
//             <div className="flex items-center gap-3 mb-4">
//               <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                 {article.category}
//               </span>
//               <span className="text-gray-600 text-sm">{article.readTime}</span>
//             </div>
//
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{article.title}</h1>
//
//             <div className="flex flex-wrap gap-6 text-gray-600 text-sm mb-6 pb-6 border-b border-gray-200">
//               <div>
//                 <p className="font-semibold text-gray-900">{article.author}</p>
//                 <p>Author</p>
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-900">
//                   {new Date(article.date).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric',
//                   })}
//                 </p>
//                 <p>Published</p>
//               </div>
//             </div>
//           </header>
//
//           <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
//             {(article.content || '').split('\n').map((line, i) => (
//               <p key={i} className="mb-4">
//                 {line}
//               </p>
//             ))}
//           </div>
//
//           <div className="mt-12 pt-8 border-t border-gray-200">
//             <p className="text-gray-600 mb-4 font-semibold">Share this article:</p>
//             <div className="flex gap-4">
//               <a
//                 href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-200"
//               >
//                 Twitter
//               </a>
//               <a
//                 href={`https://www.facebook.com/sharer/sharer.php?u=https://storycraft.com/blog/${article.slug}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
//               >
//                 Facebook
//               </a>
//             </div>
//           </div>
//         </article>
//
//         {relatedArticles.length > 0 && (
//           <section className="mt-12">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
//             <div className="grid gap-6">
//               {relatedArticles.map((related) => (
//                 <Link
//                   key={related.id}
//                   href={`/blog/${related.slug}`}
//                   className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4 border-blue-600 group"
//                 >
//                   <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
//                     {related.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm">{related.readTime}</p>
//                 </Link>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </main>
//   );
// }
//
