
import { getContent } from '@/lib/content';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import Footer from '@/components/landing/Footer';
import type { Section, HeroSectionData, FeaturesSectionData, CtaSectionData, AboutUsSectionData, FeaturedArticleSectionData } from '@/types';
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

export default async function Home() {
  const content = await getContent();

  const renderSection = (section: Section) => {
    const Component = sectionComponents[section.type as keyof typeof sectionComponents];
    if (Component) {
      return <Component key={section.id} {...(section as any)} />;
    }
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {content.sections.map(renderSection)}
      </main>
      <Footer />
    </div>
  );
}
