import type { HeroSectionData } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUploader from './ImageUploader';

interface HeroSectionEditorProps {
  data: HeroSectionData;
  onChange: (newData: HeroSectionData) => void;
}

export default function HeroSectionEditor({ data, onChange }: HeroSectionEditorProps) {
  const handleChange = (field: keyof HeroSectionData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`headline-${data.id}`}>Headline</Label>
        <Input
          id={`headline-${data.id}`}
          value={data.headline}
          onChange={(e) => handleChange('headline', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`subtext-${data.id}`}>Subtext</Label>
        <Textarea
          id={`subtext-${data.id}`}
          value={data.subtext}
          onChange={(e) => handleChange('subtext', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`cta_button_text-${data.id}`}>Button Text</Label>
        <Input
          id={`cta_button_text-${data.id}`}
          value={data.cta_button_text}
          onChange={(e) => handleChange('cta_button_text', e.target.value)}
        />
      </div>
      <ImageUploader
        label="Hero Image"
        currentImageUrl={data.image_url}
        onUploadSuccess={(url) => handleChange('image_url', url)}
      />
    </div>
  );
}
