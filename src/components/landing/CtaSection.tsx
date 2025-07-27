import type { CtaSectionData } from '@/types';
import ProjectBriefForm from './ProjectBriefForm';

const CtaSection = ({ title, subtext, button_text }: CtaSectionData) => {
  return (
    <section id="cta" className="py-20 md:py-24 bg-secondary/20 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground mb-12">
            {subtext}
          </p>
          <ProjectBriefForm />
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
