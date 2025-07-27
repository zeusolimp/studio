"use client";

import { useState, useEffect } from 'react';
import { getContent } from '@/lib/content';
import type { Section, LandingContent } from '@/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HeroSectionEditor from '@/components/backoffice/HeroSectionEditor';
import FeaturesSectionEditor from '@/components/backoffice/FeaturesSectionEditor';
import CtaSectionEditor from '@/components/backoffice/CtaSectionEditor';
import AboutUsSectionEditor from '@/components/backoffice/AboutUsSectionEditor';

const sectionEditorComponents = {
  hero: HeroSectionEditor,
  features: FeaturesSectionEditor,
  about: AboutUsSectionEditor,
  cta: CtaSectionEditor,
};

export default function ContentTabs({ initialContent }: { initialContent: LandingContent }) {
    const [content, setContent] = useState<LandingContent | null>(initialContent);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handleSave = async () => {
        if (!content) return;
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
        if (!content) return;
        const newSections = [...content.sections];
        newSections[index] = newSectionData;
        setContent({ ...content, sections: newSections });
    };
    
    if (isLoading || !content) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const getSection = (type: Section['type']) => {
        const section = content.sections.find(s => s.type === type);
        const index = content.sections.findIndex(s => s.type === type);
        return { section, index };
    }

    const renderEditorFor = (type: Section['type']) => {
        const { section, index } = getSection(type);
        if (!section || index === -1) return <div>Section '{type}' not found.</div>;
        const EditorComponent = sectionEditorComponents[type];
        return <EditorComponent data={section as any} onChange={(newSectionData) => handleSectionChange(index, newSectionData)} />;
    }

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h1 className="text-3xl font-bold font-headline">Content Editor</h1>
                <Button onClick={handleSave} disabled={isSaving || isLoading} size="lg">
                    {isSaving ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    {isSaving ? 'Saving...' : 'Save All Changes'}
                </Button>
            </div>
            <Tabs defaultValue="hero" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="hero">Hero Section</TabsTrigger>
                    <TabsTrigger value="services">Services Section</TabsTrigger>
                    <TabsTrigger value="about">About Us Section</TabsTrigger>
                    <TabsTrigger value="cta">CTA Section</TabsTrigger>
                </TabsList>
                <TabsContent value="hero">{renderEditorFor('hero')}</TabsContent>
                <TabsContent value="services">{renderEditorFor('features')}</TabsContent>
                <TabsContent value="about">{renderEditorFor('about')}</TabsContent>
                <TabsContent value="cta">{renderEditorFor('cta')}</TabsContent>
            </Tabs>
        </div>
    );
}
