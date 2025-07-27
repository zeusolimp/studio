import { getContent } from '@/lib/content';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import Footer from '@/components/landing/Footer';
import type { Locale, Section } from '@/types';
import CtaSection from '@/components/landing/CtaSection';
import AboutUsSection from '@/components/landing/AboutUsSection';
import FeaturedArticleSection from '@/components/landing/FeaturedArticleSection';

const sectionComponents = {
  hero: HeroSection,
  features: FeaturesSection,
  'featured-article': FeaturedArticleSection,
  about: AboutUsSection,
  cta: CtaSection,
};

function getLocalizedContent(section: Section, locale: Locale): any {
    const localizedSection: { [key: string]: any } = {};

    for (const key in section) {
        const value = (section as any)[key];
        if (typeof value === 'object' && value !== null && !Array.isArray(value) && 'pt' in value && 'es' in value && 'en' in value && 'fr' in value) {
            localizedSection[key] = value[locale] || value['pt'];
        } else {
            localizedSection[key] = value;
        }
    }
    
    if (section.type === 'features' && 'items' in section) {
        localizedSection.items = section.items.map(item => {
            const localizedItem: { [key: string]: any } = {};
            for (const key in item) {
                 const value = (item as any)[key];
                if (typeof value === 'object' && value !== null && !Array.isArray(value) && 'pt' in value && 'es' in value && 'en' in value && 'fr' in value) {
                    localizedItem[key] = value[locale] || value['pt'];
                } else {
                    localizedItem[key] = value;
                }
            }
            return localizedItem;
        });
    }

    return localizedSection;
}

export default async function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const content = await getContent();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {content.sections
          .filter(section => section.type !== 'footer')
          .map((section: Section) => {
            const Component = sectionComponents[section.type as keyof typeof sectionComponents];
            
            if (Component) {
              const localizedProps = getLocalizedContent(section, locale);
              return <Component key={section.id} {...localizedProps} />;
            }
            
            return null;
        })}
      </main>
      <Footer />
    </div>
  );
}
