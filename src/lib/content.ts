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
      id: 'about',
      type: 'about',
      title: 'Sobre Nosotros',
      paragraph1: 'Somos un equipo de innovadores, solucionadores de problemas y apasionados por la tecnología, dedicados a transformar ideas en realidades digitales. Nuestra misión es impulsar el éxito de nuestros clientes a través de soluciones de software excepcionales y un soporte técnico inigualable.',
      paragraph2: 'Con años de experiencia en la industria, hemos perfeccionado nuestro enfoque en la creación de aplicaciones web, sitios y sistemas que no solo son visualmente impactantes, sino también robustos, escalables y seguros. Creemos en la colaboración estrecha y la comunicación transparente para garantizar que cada proyecto sea un reflejo fiel de la visión de nuestros clientes.',
      image_url: 'https://placehold.co/600x400.png',
    },
    {
      id: 'cta',
      type: 'cta',
      title: '¿Listo para Empezar tu Próximo Proyecto?',
      subtext: 'Contáctanos para descubrir cómo podemos ayudarte a alcanzar tus objetivos tecnológicos.',
      button_text: 'Crea un proyecto con nosotros',
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
    
    // Create the db directory if it doesn't exist
    try {
      await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    } catch (mkdirError) {
       console.error('Could not create db directory', mkdirError);
    }
    
    // Write the default content to the file
    try {
      await fs.writeFile(dataFilePath, JSON.stringify(defaultContent, null, 2), 'utf8');
      console.log('Created default content.json file.');
      return defaultContent;
    } catch (writeFileError) {
        console.error('Could not write default content.json file', writeFileError);
        // Return default content in memory if file writing fails
        return defaultContent;
    }
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
