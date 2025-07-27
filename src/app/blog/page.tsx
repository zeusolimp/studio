import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const placeholderPosts = [
  {
    id: 1,
    title: 'Maximizando a Eficiência com Desenvolvimento à Medida',
    excerpt: 'Descubra como as soluções de software personalizadas podem transformar as suas operações, melhorar a produtividade e dar-lhe uma vantagem competitiva sustentável no mercado atual.',
    category: 'Desenvolvimento de Software',
    date: 'Há 2 dias',
    author: 'A Equipa da Iddeia',
  },
  {
    id: 2,
    title: 'A Importância de uma Arquitetura de Sistema Robusta',
    excerpt: 'Uma base sólida é a chave para o sucesso a longo prazo. Exploramos por que uma arquitetura bem projetada é crucial para a escalabilidade, manutenção e segurança da sua aplicação.',
    category: 'Arquitetura de Software',
    date: 'Há 1 semana',
    author: 'A Equipa da Iddeia',
  },
  {
    id: 3,
    title: 'Suporte Técnico: O Seu Aliado Estratégico Pós-Lançamento',
    excerpt: 'O lançamento é apenas o começo. Aprenda como um bom serviço de suporte técnico não só resolve problemas, mas também impulsiona a melhoria contínua do seu produto.',
    category: 'Suporte Técnico',
    date: 'Há 2 semanas',
    author: 'A Equipa da Iddeia',
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
              O Nosso Blog
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Ideias, tutoriais e notícias do mundo da tecnologia и do desenvolvimento de software.
            </p>
          </div>

          <div className="text-center py-16 border-y border-dashed">
             <h2 className="text-2xl font-semibold text-muted-foreground">Em breve!</h2>
             <p className="text-muted-foreground mt-2">
                Estamos a trabalhar em conteúdo incrível para si.
             </p>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-headline font-semibold mb-8">Artigos Anteriores (Exemplos)</h3>
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
                Ver mais artigos
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
