"use client";

// This is a global not-found page. It's used when a page is not found
// at the root level. It should not use translations.

import Link from "next/link";

export default function NotFound() {
  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <Link href="/" className="mt-4 text-accent hover:underline">
          Go to homepage
        </Link>
      </body>
    </html>
  );
}
