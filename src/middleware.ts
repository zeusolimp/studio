
import createNextIntlMiddleware from 'next-intl/middleware';

export const locales = ['pt', 'es', 'en', 'fr'];
export const defaultLocale = 'pt';

export default createNextIntlMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
