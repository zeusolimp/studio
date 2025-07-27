
import { getContent } from '@/lib/content';
import { LandingContent } from '@/types';
import ContentTabs from '@/components/backoffice/ContentTabs';


export default async function BackofficePage() {
    const content: LandingContent = await getContent();

    return <ContentTabs initialContent={content} />;
}
