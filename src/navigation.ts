import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';
import { locales } from './middleware';

// The `pathnames` object holds pairs of page routes and their optional
// localized pathnames. This follows the shape of the `pathnames` export
// from your `i18n.ts` file.
export const pathnames = {
  '/': '/',
  '/servicios': '/servicios',
  '/sobre-nosotros': '/sobre-nosotros',
  '/blog': '/blog',
  '/contacto': '/contacto'
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames
  });