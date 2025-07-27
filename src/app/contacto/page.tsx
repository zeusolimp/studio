import { getContent } from '@/lib/content';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import CtaSection from '@/components/landing/CtaSection';
import { CtaSectionData } from '@/types';

export default async function ContactoPage() {
  const content = await getContent();
  const ctaData = content.sections.find(
    (section) => section.type === 'cta'
  ) as CtaSectionData | undefined;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {ctaData ? (
           <CtaSection {...ctaData} />
        ) : (
          <div className="container mx-auto px-4 py-20 text-center">
            <p>Contenido de la sección de contacto no encontrado.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
