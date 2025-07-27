import { promises as fs } from 'fs';
import path from 'path';
import type { LandingContent } from '@/types';

const dataFilePath = path.join(process.cwd(), 'db', 'content.json');

const defaultContent: LandingContent = {
  sections: [
    {
      id: 'hero',
      type: 'hero',
      headline: 'Build Your Landing Page, Dynamically',
      subtext: 'Our platform allows you to edit every part of this page from a simple backoffice. No code required. Change text, images, and even the layout.',
      cta_button_text: 'Try The Backoffice',
      image_url: '/uploads/hero-image.png',
    },
    {
      id: 'features',
      type: 'features',
      title: 'Everything You Need, Nothing You Don\'t',
      items: [
        {
          id: 'feat1',
          icon: 'Edit',
          title: 'Dynamic Text',
          description: 'Update any text on your landing page instantly from the content editor.',
        },
        {
          id: 'feat2',
          icon: 'Image',
          title: 'Image Uploads',
          description: 'Change images with a simple file upload. Your new visuals go live immediately.',
        },
        {
          id: 'feat3',
          icon: 'Move',
          title: 'Content Arrangement',
          description: 'Reorder sections to perfectly match your narrative and marketing goals.',
        },
      ],
    },
    {
      id: 'cta',
      type: 'cta',
      title: 'Ready to Take Control?',
      subtext: 'Explore the backoffice and see how easy it is to manage your landing page content.',
      button_text: 'Go to Backoffice',
    },
  ],
};

export async function getContent(): Promise<LandingContent> {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data;
  } catch (error) {
    console.warn('content.json not found or invalid, using default content.');
    return defaultContent;
  }
}

export async function saveContent(data: LandingContent): Promise<{ success: boolean; error?: string }> {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(dataFilePath, jsonData, 'utf8');
    return { success: true };
  } catch (error) {
    console.error('Failed to save content:', error);
    return { success: false, error: 'Could not write to content file.' };
  }
}
