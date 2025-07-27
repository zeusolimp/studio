import { getContent } from '@/lib/content';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import AboutUsSection from '@/components/landing/AboutUsSection';
import { AboutUsSectionData, Locale } from '@/types';
import { getLocale } from 'next-intl/server';

function getLocalizedContent<T extends { [key: string]: any }>(content: T, locale: Locale): T {
    const localizedContent: { [key: string]: any } = {};
    for (const key in content) {
        if (typeof content[key] === 'object' && content[key] !== null && 'pt' in content[key] && 'es' in content[key] && 'en' in content[key] && 'fr' in content[key]) {
            localizedContent[key] = content[key][locale] || content[key]['pt'];
        } else {
            localizedContent[key] = content[key];
        }
    }
    return localizedContent as T;
}


export default async function SobreNosotrosPage() {
  const content = await getContent();
  const locale = await getLocale() as Locale;
  const aboutUsData = content.sections.find(
    (section) => section.type === 'about'
  ) as AboutUsSectionData | undefined;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {aboutUsData ? (
          <AboutUsSection {...getLocalizedContent(aboutUsData, locale)} />
        ) : (
          <div className="container mx-auto px-4 py-20 text-center">
            <p>Contenido sobre nosotros no encontrado.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
