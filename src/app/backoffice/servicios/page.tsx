
import { getContent } from '@/lib/content';
import { LandingContent } from '@/types';
import ContentEditor from '@/components/backoffice/ContentEditor';

export default async function BackofficeServicesPage() {
    const content: LandingContent = await getContent();

    return <ContentEditor 
        initialContent={content} 
        allowedSections={['features']} 
    />;
}
