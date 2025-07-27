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
        <Label htmlFor={`title-${data.id}`}>Título</Label>
        <Input
          id={`title-${data.id}`}
          value={data.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`paragraph1-${data.id}`}>Parágrafo 1</Label>
        <Textarea
          id={`paragraph1-${data.id}`}
          value={data.paragraph1}
          onChange={(e) => handleChange('paragraph1', e.target.value)}
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`paragraph2-${data.id}`}>Parágrafo 2</Label>
        <Textarea
          id={`paragraph2-${data.id}`}
          value={data.paragraph2}
          onChange={(e) => handleChange('paragraph2', e.target.value)}
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`button_text-${data.id}`}>Texto do Botão</Label>
        <Input
          id={`button_text-${data.id}`}
          value={data.button_text || ''}
          onChange={(e) => handleChange('button_text', e.target.value)}
          placeholder="ex: Saber Mais"
        />
      </div>
       <div className="space-y-2">
        <Label htmlFor={`button_link-${data.id}`}>Link do Botão</Label>
        <Input
          id={`button_link-${data.id}`}
          value={data.button_link || ''}
          onChange={(e) => handleChange('button_link', e.target.value)}
          placeholder="ex: /sobre-nos"
        />
      </div>
      <ImageUploader
        label="Imagem Sobre Nós"
        currentImageUrl={data.image_url}
        onUploadSuccess={(url) => handleChange('image_url', url)}
      />
    </div>
  );
}
