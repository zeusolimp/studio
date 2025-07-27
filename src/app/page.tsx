import { getContent } from '@/lib/content';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import Footer from '@/components/landing/Footer';
import type { Section, HeroSectionData, FeaturesSectionData } from '@/types';

const sectionComponents = {
  hero: HeroSection,
  features: FeaturesSection,
};

export default async function Home() {
  const content = await getContent();

  const renderSection = (section: Section) => {
    // Ensure section.type is one of the keys in sectionComponents
    if (section.type in sectionComponents) {
        const Component = sectionComponents[section.type as keyof typeof sectionComponents];
        // The 'any' type is used here for simplicity as each component has different props.
        // In a larger application, you might use a more robust mapping or type guards.
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
