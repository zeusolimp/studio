
"use client";

import { useState } from 'react';
import type { LandingContent, Section } from '@/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import HeroSectionEditor from './HeroSectionEditor';
import FeaturesSectionEditor from './FeaturesSectionEditor';
import CtaSectionEditor from './CtaSectionEditor';
import AboutUsSectionEditor from './AboutUsSectionEditor';
import FeaturedArticleEditor from './FeaturedArticleEditor';
import FooterSectionEditor from './FooterSectionEditor';
import { Save, Loader } from 'lucide-react';

const sectionEditorComponents = {
  hero: HeroSectionEditor,
  features: FeaturesSectionEditor,
  'featured-article': FeaturedArticleEditor,
  about: AboutUsSectionEditor,
  cta: CtaSectionEditor,
  footer: FooterSectionEditor,
};

type EditorComponentType = keyof typeof sectionEditorComponents;

interface ContentEditorProps {
    initialContent: LandingContent;
    allowedSections: EditorComponentType[];
}

export default function ContentEditor({ initialContent, allowedSections }: ContentEditorProps) {
  const [content, setContent] = useState<LandingContent>(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (!response.ok) {
        throw new Error('Failed to save content');
      }
      toast({
        title: "Success!",
        description: "Your changes have been saved.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save changes. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSectionChange = (index: number, newSectionData: Section) => {
    const newSections = [...content.sections];
    newSections[index] = newSectionData;
    setContent({ ...content, sections: newSections });
  };
  
  const renderSectionEditor = (section: Section, index: number) => {
    const sectionType = section.type as EditorComponentType;
    if (!allowedSections.includes(sectionType)) return null;

    const EditorComponent = sectionEditorComponents[sectionType];
    if (!EditorComponent) return null;

    const title = `${section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section`;

    return (
        <Card key={`${section.id}-${index}`}>
            <CardHeader>
                <CardTitle className="font-headline text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <EditorComponent data={section as any} onChange={(newSectionData) => handleSectionChange(index, newSectionData)} />
            </CardContent>
        </Card>
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <h1 className="text-3xl font-headline">Content Editor</h1>
        <Button onClick={handleSave} disabled={isSaving} size="lg">
            {isSaving ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      
      <div className="space-y-6">
          {content.sections.map(renderSectionEditor)}
      </div>
    </div>
  );
}
