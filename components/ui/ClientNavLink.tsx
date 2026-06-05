    'use client';

import Link from 'next/link';
import React from 'react';

export default function ClientNavLink({
  href,
  children,
  className,
}: React.PropsWithChildren<{ href: string; className?: string }>) {
  return (
    <Link
      href={href}
      className={className}
      onClick={(e: React.MouseEvent) => {
        // Ensure navigation happens even if client router fails
        try {
          e.preventDefault();
          window.location.href = href;
        } catch (err) {
          // fallback: let Link handle navigation
        }
      }}
    >
      {children}
    </Link>
  );
}

