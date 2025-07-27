

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
import { Save, Loader, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

const sectionEditorComponents = {
  hero: HeroSectionEditor,
  features: FeaturesSectionEditor,
  about: AboutUsSectionEditor,
  cta: CtaSectionEditor,
};

export default function ContentEditor({ initialContent }: { initialContent: LandingContent }) {
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
  
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === content.sections.length - 1)) return;
    
    const newSections = [...content.sections];
    const sectionToMove = newSections[index];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;

    newSections[index] = newSections[swapIndex];
    newSections[swapIndex] = sectionToMove;

    setContent({ ...content, sections: newSections });
  };

  const handleRemoveSection = (index: number) => {
    const newSections = content.sections.filter((_, i) => i !== index);
    setContent({ ...content, sections: newSections });
  };

  const renderSectionEditor = (section: Section, index: number) => {
    const EditorComponent = sectionEditorComponents[section.type as keyof typeof sectionEditorComponents];
    if (!EditorComponent) return null;

    const title = `${section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section`;

    return (
        <Card key={`${section.id}-${index}`}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline text-xl">{title}</CardTitle>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleMoveSection(index, 'up')} disabled={index === 0}>
                        <ArrowUp className="h-4 w-4" />
                        <span className="sr-only">Move section up</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleMoveSection(index, 'down')} disabled={index === content.sections.length - 1}>
                        <ArrowDown className="h-4 w-4" />
                        <span className="sr-only">Move section down</span>
                    </Button>
                    <Button disabled variant="ghost" size="icon" onClick={() => handleRemoveSection(index)} className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete section</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <EditorComponent data={section as any} onChange={(newSectionData) => handleSectionChange(index, newSectionData)} />
            </CardContent>
        </Card>
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <h1 className="text-3xl font-bold font-headline">Content Editor</h1>
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
