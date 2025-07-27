import type { HeroSectionData } from '@/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = ({ headline, subtext, cta_button_text, image_url }: HeroSectionData) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={image_url || "https://placehold.co/1920x1080.png"}
          alt={headline}
          fill
          className="object-cover"
          data-ai-hint="web development agency"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-start-2">
                <div className="max-w-xl text-left">
                     <h1 className="font-headline text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                        {headline}
                    </h1>
                    <p className="mt-6 text-lg text-gray-200">
                        {subtext}
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="hover:opacity-90 shadow-lg shadow-accent/20">
                            <Link href="/servicios">{cta_button_text}</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
