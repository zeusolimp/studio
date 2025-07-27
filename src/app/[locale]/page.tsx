
import { getContent } from '@/lib/content';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import Footer from '@/components/landing/Footer';
import type { Section, HeroSectionData, FeaturesSectionData, CtaSectionData, AboutUsSectionData, FeaturedArticleSectionData, Locale } from '@/types';
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

export default async function Home({ params: { locale } }: { params: { locale: Locale } }) {
  const content = await getContent();

  const renderSection = (section: Section) => {
    const Component = sectionComponents[section.type as keyof typeof sectionComponents];
    if (Component) {
      const localizedSection = getLocalizedContent(section, locale);
      return <Component key={section.id} {...(localizedSection as any)} />;
    }
    return null;
  };

  const localizedSections = content.sections.map(section => {
      if (section.type === 'features') {
          return {
              ...getLocalizedContent(section, locale),
              items: section.items.map(item => getLocalizedContent(item, locale))
          };
      }
      if (section.type === 'footer') {
           return {
              ...getLocalizedContent(section, locale),
              social_links: section.social_links,
              legal_links: section.legal_links.map(link => ({
                  ...getLocalizedContent(link, locale),
                  id: link.id,
                  url: link.url
              }))
          };
      }
      return getLocalizedContent(section, locale);
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {content.sections.map(section => {
          const Component = sectionComponents[section.type as keyof typeof sectionComponents];
          if (Component) {
            let props: any;
            if (section.type === 'features') {
                props = {
                    ...getLocalizedContent(section, locale),
                    items: section.items.map(item => getLocalizedContent(item, locale))
                };
            } else if (section.type === 'footer') {
                props = {
                    ...getLocalizedContent(section, locale),
                    social_links: section.social_links,
                    legal_links: section.legal_links.map(link => ({
                       ...getLocalizedContent(link, locale),
                       id: link.id,
                       url: link.url
                    }))
                };
            } else {
                props = getLocalizedContent(section, locale);
            }
            return <Component key={section.id} {...props} />;
          }
          return null;
        })}
      </main>
      <Footer />
    </div>
  );
}
