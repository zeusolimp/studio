import type { FeaturesSectionData } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DynamicIcon } from '@/components/DynamicIcon';

const FeaturesSection = ({ title, items }: FeaturesSectionData) => {
  return (
    <section id="features" className="bg-secondary/50 py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((feature) => (
            <Card key={feature.id} className="text-center transition-transform hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <DynamicIcon name={feature.icon as any} className="h-6 w-6" />
                </div>
                <CardTitle className="font-headline text-xl font-semibold">{feature.title}</CardTitle>
                <CardDescription className="pt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
