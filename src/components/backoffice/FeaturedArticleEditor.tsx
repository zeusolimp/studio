import type { FeaturedArticleSectionData, Locale } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUploader from './ImageUploader';

interface FeaturedArticleEditorProps {
  data: FeaturedArticleSectionData;
  onChange: (newData: FeaturedArticleSectionData) => void;
  locale: Locale;
}

export default function FeaturedArticleEditor({ data, onChange, locale }: FeaturedArticleEditorProps) {
    const handleLocalizedStringChange = (field: 'title' | 'subtitle' | 'text' | 'button_text', value: string) => {
        onChange({ ...data, [field]: { ...data[field], [locale]: value } });
    };

    const handleStringChange = (field: 'button_link' | 'image_url', value: string) => {
        onChange({ ...data, [field]: value });
    };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`title-${data.id}-${locale}`}>Título</Label>
        <Input
          id={`title-${data.id}-${locale}`}
          value={data.title[locale]}
          onChange={(e) => handleLocalizedStringChange('title', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`subtitle-${data.id}-${locale}`}>Subtítulo</Label>
        <Input
          id={`subtitle-${data.id}-${locale}`}
          value={data.subtitle[locale]}
          onChange={(e) => handleLocalizedStringChange('subtitle', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`text-${data.id}-${locale}`}>Texto</Label>
        <Textarea
          id={`text-${data.id}-${locale}`}
          value={data.text[locale]}
          onChange={(e) => handleLocalizedStringChange('text', e.target.value)}
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`button_text-${data.id}-${locale}`}>Texto do Botão</Label>
        <Input
          id={`button_text-${data.id}-${locale}`}
          value={data.button_text[locale]}
          onChange={(e) => handleLocalizedStringChange('button_text', e.target.value)}
        />
      </div>
       <div className="space-y-2">
        <Label htmlFor={`button_link-${data.id}`}>Link do Botão</Label>
        <Input
          id={`button_link-${data.id}`}
          value={data.button_link}
          onChange={(e) => handleStringChange('button_link', e.target.value)}
        />
      </div>
      <ImageUploader
        label="Imagem em Destaque"
        currentImageUrl={data.image_url}
        onUploadSuccess={(url) => handleStringChange('image_url', url)}
      />
    </div>
  );
}
