import type { CtaSectionData } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface CtaSectionEditorProps {
  data: CtaSectionData;
  onChange: (newData: CtaSectionData) => void;
}

export default function CtaSectionEditor({ data, onChange }: CtaSectionEditorProps) {
  const handleChange = (field: keyof CtaSectionData, value: string) => {
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
        <Label htmlFor={`subtext-${data.id}`}>Subtext</Label>
        <Textarea
          id={`subtext-${data.id}`}
          value={data.subtext}
          onChange={(e) => handleChange('subtext', e.target.value)}
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
    </div>
  );
}
