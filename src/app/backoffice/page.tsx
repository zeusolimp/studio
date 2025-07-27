import { getContent } from '@/lib/content';
import ContentEditor from '@/components/backoffice/ContentEditor';

export default async function BackofficePage() {
  const content = await getContent();

  return (
    <ContentEditor initialContent={content} />
  );
}
