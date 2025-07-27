import type { HeroSectionData } from '@/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = ({ headline, subtext, cta_button_text, image_url }: HeroSectionData) => {
  return (
    <section id="hero" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {headline}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {subtext}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="hover:opacity-90">
                <Link href="/backoffice">{cta_button_text}</Link>
              </Button>
            </div>
          </div>
          <div>
            <Image
              src={image_url || "https://placehold.co/600x400.png"}
              alt={headline}
              width={600}
              height={400}
              className="mx-auto rounded-lg shadow-2xl"
              data-ai-hint="digital product"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
