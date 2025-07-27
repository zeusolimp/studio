import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['pt', 'es', 'en', 'fr'],
  defaultLocale: 'pt'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
