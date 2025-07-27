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
  '/servicios': {
    pt: '/servicos',
    es: '/servicios',
    en: '/services',
    fr: '/services'
  },
  '/sobre-nosotros': {
    pt: '/sobre-nos',
    es: '/sobre-nosotros',
    en: '/about-us',
    fr: '/a-propos'
  },
  '/blog': '/blog',
  '/contacto': {
    pt: '/contacto',
    es: '/contacto',
    en: '/contact',
    fr: '/contact'
  },
  '/backoffice': {
    pt: '/backoffice',
    es: '/backoffice',
    en: '/backoffice',
    fr: '/backoffice'
  },
  '/backoffice/inicio': {
    pt: '/backoffice/inicio',
    es: '/backoffice/inicio',
    en: '/backoffice/home',
    fr: '/backoffice/accueil'
  },
  '/backoffice/servicos': {
    pt: '/backoffice/servicos',
    es: '/backoffice/servicios',
    en: '/backoffice/services',
    fr: '/backoffice/services'
  },
  '/backoffice/sobre-nosotros': {
    pt: '/backoffice/sobre-nos',
    es: '/backoffice/sobre-nosotros',
    en: '/backoffice/about-us',
    fr: '/backoffice/a-propos'
  },
  '/backoffice/blog': {
    pt: '/backoffice/blog',
    es: '/backoffice/blog',
    en: '/backoffice/blog',
    fr: '/backoffice/blog'
  },
  '/backoffice/contacto': {
    pt: '/backoffice/contacto',
    es: '/backoffice/contacto',
    en: '/backoffice/contact',
    fr: '/backoffice/contact'
  },
  '/backoffice/footer': {
    pt: '/backoffice/rodape',
    es: '/backoffice/footer',
    en: '/backoffice/footer',
    fr: '/backoffice/pied-de-page'
  },
  '/backoffice/configuracoes': {
    pt: '/backoffice/configuracoes',
    es: '/backoffice/configuraciones',
    en: '/backoffice/settings',
    fr: '/backoffice/parametres'
  }
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames
  });