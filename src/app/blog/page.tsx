import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

export default async function BlogPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">Nuestro Blog</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">Próximamente compartiremos artículos sobre tecnología y desarrollo.</p>
          </div>
      </main>
      <Footer />
    </div>
  );
}
