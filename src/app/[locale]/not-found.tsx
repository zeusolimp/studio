import Link from "next-intl/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <html>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold">{t("title")}</h1>
            <Link href="/" className="mt-4 text-accent hover:underline">
                {t("cta")}
            </Link>
        </main>
      </body>
    </html>
  );
}
