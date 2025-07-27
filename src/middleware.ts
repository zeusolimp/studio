import createNextIntlMiddleware from 'next-intl/middleware';

export const locales = ['pt', 'es', 'en', 'fr'];
export const defaultLocale = 'pt';

export default createNextIntlMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};