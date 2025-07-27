import type { CtaSectionData } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CtaSection = ({ title, subtext, button_text }: CtaSectionData) => {
  return (
    <section id="cta" className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {subtext}
          </p>
          <div className="mt-8">
            <Button asChild size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="hover:opacity-90">
              <Link href="/backoffice">{button_text}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
