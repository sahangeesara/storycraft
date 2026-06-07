'use client';

import { useState, useEffect } from 'react';
import type { BlogArticle } from '@/lib/blog';

export default function ArticlePreview({ article }: { article: BlogArticle }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash;
      if (hash === `#preview-${article.slug}`) {
        setOpen(true);
      } else if (open && !hash.startsWith('#preview-')) {
        setOpen(false);
      }
    };

    // On mount, check if hash already requests this preview
    checkHash();

    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [article.slug, open]);

  return (
    <>
      {/* Client-side button for users with JS */}
      <button
        onClick={() => {
          // set the hash so the corresponding client instance will open
          window.location.hash = `preview-${article.slug}`;
        }}
        className="ml-4 inline-block text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded transition"
      >
        Preview
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
          <div className="fixed inset-0 bg-black opacity-40" onClick={() => { setOpen(false); window.location.hash = ''; }}></div>
          <div className="relative max-w-3xl w-full bg-white rounded shadow-lg overflow-auto" style={{ maxHeight: '80vh' }}>
            <div className="p-4 border-b flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold">{article.title}</h3>
                <p className="text-sm text-gray-500">By {article.author} • {article.readTime}</p>
              </div>
              <div>
                <button
                  onClick={() => { setOpen(false); window.location.hash = ''; }}
                  className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="p-6 prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
              {article.content ? (
                article.content.split('\n').map((line, i) => (
                  <p key={i} className="mb-2">{line}</p>
                ))
              ) : (
                <p>{article.excerpt}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

