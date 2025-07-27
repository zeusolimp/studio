import type { FeaturedArticleSectionData } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const FeaturedArticleSection = ({ title, subtitle, text, image_url, button_text, button_link }: FeaturedArticleSectionData) => {
  return (
    <section id="featured-article" className="py-20 md:py-24 bg-secondary/20 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src={image_url || 'https://placehold.co/600x400.png'}
              alt={title}
              width={600}
              height={400}
              className="mx-auto rounded-lg shadow-2xl"
              data-ai-hint="technology blog article"
            />
          </div>
          <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-accent mb-2">{title}</h3>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4">
              {subtitle}
            </h2>
            <p className="text-muted-foreground mb-6">{text}</p>
            <Button asChild size="lg">
              <Link href={button_link}>{button_text}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticleSection;
