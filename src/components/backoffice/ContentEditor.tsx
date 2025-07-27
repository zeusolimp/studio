
"use client";

import { useState } from 'react';
import type { LandingContent, Section, Locale } from '@/types';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from 'next-intl';

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

const locales: Locale[] = ['pt', 'es', 'en', 'fr'];

export default function ContentEditor({ initialContent, allowedSections }: ContentEditorProps) {
  const [content, setContent] = useState<LandingContent>(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('Backoffice');

  const localeNames: {[key in Locale]: string} = {
    pt: t('pt'),
    es: t('es'),
    en: t('en'),
    fr: t('fr')
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (!response.ok) {
        throw new Error('Falha ao guardar o conteúdo');
      }
      toast({
        title: t('saveSuccessTitle'),
        description: t('saveSuccessDescription'),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('saveErrorTitle'),
        description: t('saveErrorDescription'),
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
  
  const getSectionTitle = (type: EditorComponentType) => {
    const formattedType = type.replace(/-(\w)/g, (_, c) => c.toUpperCase());
    const key = `${formattedType}Section.title` as any;
    try {
        const translatedTitle = t(key);
        if (translatedTitle && translatedTitle !== key) {
            return t('sectionTitle', {title: translatedTitle});
        }
    } catch (e) {
        // translation not found
    }
    return t('sectionTitle', {title: type.charAt(0).toUpperCase() + type.slice(1)});
  }

  const renderSectionEditor = (section: Section, index: number) => {
    const sectionType = section.type as EditorComponentType;
    if (!allowedSections.includes(sectionType)) return null;

    const EditorComponent = sectionEditorComponents[sectionType];
    if (!EditorComponent) return null;

    const title = getSectionTitle(sectionType);
    
    // Check if any field in the section data is a localized string
    const isLocalized = Object.values(section).some(value => 
        typeof value === 'object' && value !== null && !Array.isArray(value) && 'pt' in value && 'es' in value && 'en' in value && 'fr' in value
    );
    
    if (isLocalized || section.type === 'features' || section.type === 'footer') {
        return (
             <Card key={`${section.id}-${index}`}>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="pt">
                        <TabsList>
                            {locales.map(loc => <TabsTrigger key={loc} value={loc}>{localeNames[loc]}</TabsTrigger>)}
                        </TabsList>
                        {locales.map(loc => (
                            <TabsContent key={loc} value={loc} className='pt-4'>
                                <EditorComponent data={section as any} onChange={(newSectionData) => handleSectionChange(index, newSectionData)} locale={loc} />
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card key={`${section.id}-${index}`}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
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
        <h1 className="text-3xl font-headline">{t('title')}</h1>
        <Button onClick={handleSave} disabled={isSaving} size="lg">
            {isSaving ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isSaving ? t('savingButton') : t('saveButton')}
        </Button>
      </div>
      
      <div className="space-y-6">
          {content.sections.map(renderSectionEditor)}
      </div>
    </div>
  );
}
