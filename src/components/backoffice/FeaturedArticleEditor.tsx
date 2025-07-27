import type { FeaturedArticleSectionData } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUploader from './ImageUploader';

interface FeaturedArticleEditorProps {
  data: FeaturedArticleSectionData;
  onChange: (newData: FeaturedArticleSectionData) => void;
}

export default function FeaturedArticleEditor({ data, onChange }: FeaturedArticleEditorProps) {
  const handleChange = (field: keyof FeaturedArticleSectionData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`title-${data.id}`}>Title</Label>
        <Input
          id={`title-${data.id}`}
          value={data.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`subtitle-${data.id}`}>Subtitle</Label>
        <Input
          id={`subtitle-${data.id}`}
          value={data.subtitle}
          onChange={(e) => handleChange('subtitle', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`text-${data.id}`}>Text</Label>
        <Textarea
          id={`text-${data.id}`}
          value={data.text}
          onChange={(e) => handleChange('text', e.target.value)}
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`button_text-${data.id}`}>Button Text</Label>
        <Input
          id={`button_text-${data.id}`}
          value={data.button_text}
          onChange={(e) => handleChange('button_text', e.target.value)}
        />
      </div>
       <div className="space-y-2">
        <Label htmlFor={`button_link-${data.id}`}>Button Link</Label>
        <Input
          id={`button_link-${data.id}`}
          value={data.button_link}
          onChange={(e) => handleChange('button_link', e.target.value)}
        />
      </div>
      <ImageUploader
        label="Featured Image"
        currentImageUrl={data.image_url}
        onUploadSuccess={(url) => handleChange('image_url', url)}
      />
    </div>
  );
}
