import { getContent } from '@/lib/content';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import FeaturesSection from '@/components/landing/FeaturesSection';
import { FeaturesSectionData } from '@/types';

export default async function ServiciosPage() {
  const content = await getContent();
  const featuresData = content.sections.find(
    (section) => section.type === 'features'
  ) as FeaturesSectionData | undefined;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {featuresData ? (
          <FeaturesSection {...featuresData} />
        ) : (
          <div className="container mx-auto px-4 py-20 text-center">
            <p>Contenido de servicios no encontrado.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
