"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function BlogPage() {
  const t = useTranslations('BlogPage');

  const placeholderPosts = [
    {
      id: 1,
      title: t('article1.title'),
      excerpt: t('article1.excerpt'),
      category: t('article1.category'),
      date: t('article1.date'),
      author: t('article1.author'),
    },
    {
      id: 2,
      title: t('article2.title'),
      excerpt: t('article2.excerpt'),
      category: t('article2.category'),
      date: t('article2.date'),
      author: t('article2.author'),
    },
    {
      id: 3,
      title: t('article3.title'),
      excerpt: t('article3.excerpt'),
      category: t('article3.category'),
      date: t('article3.date'),
      author: t('article3.author'),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-secondary/20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>

          <div className="text-center py-16 border-y border-dashed">
             <h2 className="text-2xl font-semibold text-muted-foreground">{t('comingSoonTitle')}</h2>
             <p className="text-muted-foreground mt-2">
                {t('comingSoonDescription')}
             </p>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-headline font-semibold mb-8">{t('pastArticlesTitle')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-50">
              {placeholderPosts.map((post) => (
                <Card key={post.id} className="text-left overflow-hidden transition-shadow hover:shadow-xl">
                  <CardContent className="p-6">
                    <p className="text-sm text-accent font-medium mb-2">{post.category}</p>
                    <h4 className="font-headline text-xl font-semibold mb-3 leading-snug">{post.title}</h4>
                    <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                    <div className="text-xs text-muted-foreground">
                      <span>{post.author}</span> &middot; <span>{post.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
             <Button size="lg" disabled className="mt-12">
                {t('viewMoreButton')}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
