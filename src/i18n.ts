import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales} from './middleware';

export default getRequestConfig(async () => {
  // This logic is often shared across server-side rendered pages.
  // We can also use it for client components, which is why we read
  // the headers even though we have the locale from the params.
  const locale = 'pt'; // A default locale, will be overridden by middleware

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale: locale
  };
});
