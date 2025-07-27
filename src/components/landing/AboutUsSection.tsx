import type { AboutUsSectionData } from '@/types';
import Image from 'next/image';

const AboutUsSection = ({ title, paragraph1, paragraph2, image_url }: AboutUsSectionData) => {
  return (
    <section id="about" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-6">
              {title}
            </h2>
            <div className="space-y-4 text-muted-foreground">
                <p>{paragraph1}</p>
                <p>{paragraph2}</p>
            </div>
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
