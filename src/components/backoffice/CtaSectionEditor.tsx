import type { CtaSectionData, Locale } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface CtaSectionEditorProps {
  data: CtaSectionData;
  onChange: (newData: CtaSectionData) => void;
  locale: Locale;
}

export default function CtaSectionEditor({ data, onChange, locale }: CtaSectionEditorProps) {
  const handleChange = (field: 'title' | 'subtext' | 'button_text', value: string) => {
    onChange({ ...data, [field]: { ...data[field], [locale]: value } });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`title-${data.id}-${locale}`}>Title</Label>
        <Input
          id={`title-${data.id}-${locale}`}
          value={data.title[locale]}
          onChange={(e) => handleChange('title', e.target.value)}
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
        <Label htmlFor={`button_text-${data.id}-${locale}`}>Button Text</Label>
        <Input
          id={`button_text-${data.id}-${locale}`}
          value={data.button_text[locale]}
          onChange={(e) => handleChange('button_text', e.target.value)}
        />
      </div>
    </div>
  );
}
