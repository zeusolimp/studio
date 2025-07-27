import type { AboutUsSectionData } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUploader from './ImageUploader';

interface AboutUsSectionEditorProps {
  data: AboutUsSectionData;
  onChange: (newData: AboutUsSectionData) => void;
}

export default function AboutUsSectionEditor({ data, onChange }: AboutUsSectionEditorProps) {
  const handleChange = (field: keyof AboutUsSectionData, value: string) => {
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
        <Label htmlFor={`paragraph1-${data.id}`}>Paragraph 1</Label>
        <Textarea
          id={`paragraph1-${data.id}`}
          value={data.paragraph1}
          onChange={(e) => handleChange('paragraph1', e.target.value)}
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`paragraph2-${data.id}`}>Paragraph 2</Label>
        <Textarea
          id={`paragraph2-${data.id}`}
          value={data.paragraph2}
          onChange={(e) => handleChange('paragraph2', e.target.value)}
          rows={4}
        />
      </div>
      <ImageUploader
        label="About Us Image"
        currentImageUrl={data.image_url}
        onUploadSuccess={(url) => handleChange('image_url', url)}
      />
    </div>
  );
}
