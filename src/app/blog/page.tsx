import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const placeholderPosts = [
  {
    id: 1,
    title: 'Maximizando la Eficiencia con Desarrollo a Medida',
    excerpt: 'Descubre cómo las soluciones de software personalizadas pueden transformar tus operaciones, mejorar la productividad y darte una ventaja competitiva sostenible en el mercado actual.',
    category: 'Desarrollo de Software',
    date: 'Hace 2 días',
    author: 'El Equipo de Iddeia',
  },
  {
    id: 2,
    title: 'La Importancia de una Arquitectura de Sistema Robusta',
    excerpt: 'Una base sólida es clave para el éxito a largo plazo. Exploramos por qué una arquitectura bien diseñada es crucial para la escalabilidad, el mantenimiento y la seguridad de tu aplicación.',
    category: 'Arquitectura de Software',
    date: 'Hace 1 semana',
    author: 'El Equipo de Iddeia',
  },
  {
    id: 3,
    title: 'Soporte Técnico: Tu Aliado Estratégico post-lanzamiento',
    excerpt: 'El lanzamiento es solo el comienzo. Aprende cómo un buen servicio de soporte técnico no solo resuelve problemas, sino que también impulsa la mejora continua de tu producto.',
    category: 'Soporte Técnico',
    date: 'Hace 2 semanas',
    author: 'El Equipo de Iddeia',
  },
];

export default async function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-secondary/20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Nuestro Blog
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Ideas, tutoriales y noticias del mundo de la tecnología y el desarrollo de software.
            </p>
          </div>

          <div className="text-center py-16 border-y border-dashed">
             <h2 className="text-2xl font-semibold text-muted-foreground">¡Muy pronto!</h2>
             <p className="text-muted-foreground mt-2">
                Estamos trabajando en contenido increíble para ti.
             </p>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-headline font-semibold mb-8">Artículos Anteriores (Ejemplos)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-50">
              {placeholderPosts.map((post) => (
                <Card key={post.id} className="text-left overflow-hidden transition-shadow hover:shadow-xl">
                  <CardContent className="p-6">
                    <p className="text-sm text-accent font-medium mb-2">{post.category}</p>
                    <h4 className="font-headline text-xl font-semibold mb-3 leading-snug">{post.title}</h4>
                    <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                    <div className="text-xs text-muted-foreground">
                      <span>Por {post.author}</span> &middot; <span>{post.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
             <Button size="lg" disabled className="mt-12">
                Ver más artículos
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
