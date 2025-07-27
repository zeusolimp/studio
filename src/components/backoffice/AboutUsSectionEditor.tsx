import type { AboutUsSectionData, Locale } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUploader from './ImageUploader';

interface AboutUsSectionEditorProps {
  data: AboutUsSectionData;
  onChange: (newData: AboutUsSectionData) => void;
  locale: Locale;
}

export default function AboutUsSectionEditor({ data, onChange, locale }: AboutUsSectionEditorProps) {
  const handleLocalizedStringChange = (field: 'title' | 'paragraph1' | 'paragraph2' | 'button_text', value: string) => {
      onChange({ ...data, [field]: { ...data[field as 'title' | 'paragraph1' | 'paragraph2' | 'button_text'], [locale]: value } });
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
        <Label htmlFor={`paragraph1-${data.id}-${locale}`}>Parágrafo 1</Label>
        <Textarea
          id={`paragraph1-${data.id}-${locale}`}
          value={data.paragraph1[locale]}
          onChange={(e) => handleLocalizedStringChange('paragraph1', e.target.value)}
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`paragraph2-${data.id}-${locale}`}>Parágrafo 2</Label>
        <Textarea
          id={`paragraph2-${data.id}-${locale}`}
          value={data.paragraph2[locale]}
          onChange={(e) => handleLocalizedStringChange('paragraph2', e.target.value)}
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`button_text-${data.id}-${locale}`}>Texto do Botão</Label>
        <Input
          id={`button_text-${data.id}-${locale}`}
          value={data.button_text ? data.button_text[locale] : ''}
          onChange={(e) => handleLocalizedStringChange('button_text', e.target.value)}
          placeholder="ex: Saber Mais"
        />
      </div>
       <div className="space-y-2">
        <Label htmlFor={`button_link-${data.id}`}>Link do Botão</Label>
        <Input
          id={`button_link-${data.id}`}
          value={data.button_link || ''}
          onChange={(e) => handleStringChange('button_link', e.target.value)}
          placeholder="ex: /sobre-nos"
        />
      </div>
      <ImageUploader
        label="Imagem Sobre Nós"
        currentImageUrl={data.image_url}
        onUploadSuccess={(url) => handleStringChange('image_url', url)}
      />
    </div>
  );
}
