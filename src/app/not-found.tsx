
"use client";

// This is a global not-found page. It's used when a page is not found
// at the root level. When a page is not found within a locale, the
// not-found.tsx under the [locale] directory is used.

import { useTranslations, Link } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <Link href="/" className="mt-4 text-accent hover:underline">
          {t("cta")}
        </Link>
      </body>
    </html>
  );
}
