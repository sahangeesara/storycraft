import React from 'react';

export default function PreviewLink({ slug }: { slug: string }) {
  return (
    // Navigate to the blog page and set the hash so the client preview opens
    <a href={`/blog#preview-${slug}`} className="ml-4 text-sm text-gray-600 hover:underline">
      Preview
    </a>
  );
}

