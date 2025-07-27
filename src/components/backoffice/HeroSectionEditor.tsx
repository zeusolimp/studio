import type { HeroSectionData, Locale } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUploader from './ImageUploader';

interface HeroSectionEditorProps {
  data: HeroSectionData;
  onChange: (newData: HeroSectionData) => void;
  locale: Locale;
}

export default function HeroSectionEditor({ data, onChange, locale }: HeroSectionEditorProps) {
  const handleChange = (field: keyof HeroSectionData['headline' | 'subtext' | 'cta_button_text'], value: string) => {
    onChange({ 
        ...data, 
        [field]: {
            ...data[field as keyof typeof data],
            [locale]: value
        }
    });
  };

  const handleImageChange = (url: string) => {
    onChange({ ...data, image_url: url });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`headline-${data.id}-${locale}`}>Headline</Label>
        <Input
          id={`headline-${data.id}-${locale}`}
          value={data.headline[locale]}
          onChange={(e) => handleChange('headline', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`subtext-${data.id}-${locale}`}>Subtext</Label>
        <Textarea
          id={`subtext-${data.id}-${locale}`}
          value={data.subtext[locale]}
          onChange={(e) => handleChange('subtext', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`cta_button_text-${data.id}-${locale}`}>Button Text</Label>
        <Input
          id={`cta_button_text-${data.id}-${locale}`}
          value={data.cta_button_text[locale]}
          onChange={(e) => handleChange('cta_button_text', e.target.value)}
        />
      </div>
      <ImageUploader
        label="Hero Image"
        currentImageUrl={data.image_url}
        onUploadSuccess={handleImageChange}
      />
    </div>
  );
}
