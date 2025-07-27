import { getContent } from '@/lib/content';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import AboutUsSection from '@/components/landing/AboutUsSection';
import { AboutUsSectionData } from '@/types';

export default async function SobreNosotrosPage() {
  const content = await getContent();
  const aboutUsData = content.sections.find(
    (section) => section.type === 'about'
  ) as AboutUsSectionData | undefined;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {aboutUsData ? (
          <AboutUsSection {...aboutUsData} />
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
