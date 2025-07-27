import type { FeaturesSectionData, FeatureItem } from '@/types';
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
}

const availableIcons = Object.keys(iconMap);

export default function FeaturesSectionEditor({ data, onChange }: FeaturesSectionEditorProps) {
  const handleChange = (field: 'title' | 'subtext', value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleItemChange = (index: number, field: keyof FeatureItem, value: string) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...data, items: newItems });
  };
  
  const handleAddItem = () => {
    const newItem: FeatureItem = {
      id: `feat-${Date.now()}`,
      icon: 'PenTool',
      title: 'Nova Funcionalidade',
      description: 'Uma breve descrição desta nova funcionalidade.',
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
        <Label htmlFor={`title-${data.id}`}>Título da Secção</Label>
        <Input
          id={`title-${data.id}`}
          value={data.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>

       <div className="space-y-2">
        <Label htmlFor={`subtext-${data.id}`}>Subtexto</Label>
        <Textarea
          id={`subtext-${data.id}`}
          value={data.subtext}
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
                    <Label htmlFor={`item-title-${item.id}`}>Título</Label>
                    <Input id={`item-title-${item.id}`} value={item.title} onChange={(e) => handleItemChange(index, 'title', e.target.value)} />
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
                <Label htmlFor={`item-desc-${item.id}`}>Descrição</Label>
                <Input id={`item-desc-${item.id}`} value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} />
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
