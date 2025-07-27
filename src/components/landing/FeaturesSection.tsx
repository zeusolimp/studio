import type { FeaturesSectionData } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DynamicIcon } from '@/components/DynamicIcon';

const FeaturesSection = ({ title, items }: FeaturesSectionData) => {
  return (
    <section id="features" className="bg-background py-20 md:py-24 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((feature) => (
            <Card key={feature.id} className="text-center transition-transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 bg-secondary/20 border-border/50">
              <CardHeader className="p-8">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <DynamicIcon name={feature.icon as any} className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-xl font-semibold">{feature.title}</CardTitle>
                <CardDescription className="pt-2 text-muted-foreground">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
