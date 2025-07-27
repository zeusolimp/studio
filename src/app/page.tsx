import { getContent } from '@/lib/content';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import CtaSection from '@/components/landing/CtaSection';
import Footer from '@/components/landing/Footer';
import type { Section, HeroSectionData, FeaturesSectionData, CtaSectionData } from '@/types';

const sectionComponents = {
  hero: HeroSection,
  features: FeaturesSection,
  cta: CtaSection,
};

export default async function Home() {
  const content = await getContent();

  const renderSection = (section: Section) => {
    const Component = sectionComponents[section.type as keyof typeof sectionComponents];
    if (!Component) {
      return null;
    }
    // The 'any' type is used here for simplicity as each component has different props.
    // In a larger application, you might use a more robust mapping or type guards.
    return <Component key={section.id} {...(section as any)} />;
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
