import type { AboutUsSectionData } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const AboutUsSection = ({ title, paragraph1, paragraph2, image_url, button_text, button_link }: AboutUsSectionData) => {
  return (
    <section id="about" className="py-20 md:py-24 bg-background min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-3xl tracking-tight text-foreground md:text-4xl mb-6">
              {title}
            </h2>
            <div className="space-y-4 text-muted-foreground">
                <p>{paragraph1}</p>
                <p>{paragraph2}</p>
            </div>
             {button_text && button_link && (
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href={button_link}>{button_text}</Link>
                </Button>
              </div>
            )}
          </div>
          <div>
            <Image
              src={image_url || 'https://placehold.co/600x400.png'}
              alt={title}
              width={600}
              height={400}
              className="mx-auto rounded-lg shadow-2xl"
              data-ai-hint="team collaboration office"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
