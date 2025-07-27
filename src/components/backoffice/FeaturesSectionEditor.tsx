import type { FeaturesSectionData, FeatureItem, Locale } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { iconMap } from '@/components/DynamicIcon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '../ui/textarea';

interface FeaturesSectionEditorProps {
  data: FeaturesSectionData;
  onChange: (newData: FeaturesSectionData) => void;
  locale: Locale;
}

const availableIcons = Object.keys(iconMap);

export default function FeaturesSectionEditor({ data, onChange, locale }: FeaturesSectionEditorProps) {
  const handleChange = (field: 'title' | 'subtext', value: string) => {
    onChange({ ...data, [field]: { ...data[field], [locale]: value } });
  };

  const handleItemChange = (index: number, field: keyof FeatureItem, value: any) => {
    const newItems = [...data.items];
    const item = newItems[index];

    if (field === 'title' || field === 'description') {
        item[field][locale] = value;
    } else {
        (item as any)[field] = value;
    }
    
    onChange({ ...data, items: newItems });
  };
  
  const handleAddItem = () => {
    const newItem: FeatureItem = {
      id: `feat-${Date.now()}`,
      icon: 'PenTool',
      title: { pt: 'Nova Funcionalidade', es: 'Nueva Característica', en: 'New Feature', fr: 'Nouvelle fonctionnalité' },
      description: { pt: 'Uma breve descrição desta nova funcionalidade.', es: 'Una breve descripción de esta nueva característica.', en: 'A brief description of this new feature.', fr: 'Une brève description de cette nouvelle fonctionnalité.' },
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    onChange({ ...data, items: newItems });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor={`title-${data.id}-${locale}`}>Título da Secção</Label>
        <Input
          id={`title-${data.id}-${locale}`}
          value={data.title[locale]}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>

       <div className="space-y-2">
        <Label htmlFor={`subtext-${data.id}-${locale}`}>Subtexto</Label>
        <Textarea
          id={`subtext-${data.id}-${locale}`}
          value={data.subtext[locale]}
          onChange={(e) => handleChange('subtext', e.target.value)}
        />
      </div>
      
      <div className="space-y-4">
        <Label>Funcionalidades</Label>
        {data.items.map((item, index) => (
          <div key={item.id} className="border p-4 rounded-md space-y-3 relative bg-background/50">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleRemoveItem(index)}>
                <Trash2 className="h-4 w-4" />
                 <span className="sr-only">Apagar funcionalidade</span>
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor={`item-title-${item.id}-${locale}`}>Título</Label>
                    <Input id={`item-title-${item.id}-${locale}`} value={item.title[locale]} onChange={(e) => handleItemChange(index, 'title', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`item-icon-${item.id}`}>Ícone</Label>
                     <Select value={item.icon} onValueChange={(value) => handleItemChange(index, 'icon', value)}>
                        <SelectTrigger id={`item-icon-${item.id}`}>
                            <SelectValue placeholder="Selecione um ícone" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableIcons.map(iconName => (
                                <SelectItem key={iconName} value={iconName}>{iconName}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor={`item-desc-${item.id}-${locale}`}>Descrição</Label>
                <Input id={`item-desc-${item.id}-${locale}`} value={item.description[locale]} onChange={(e) => handleItemChange(index, 'description', e.target.value)} />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={handleAddItem}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Funcionalidade
        </Button>
      </div>
    </div>
  );
}
