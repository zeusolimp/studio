
import type { FooterSectionData, SocialLink, FooterLink } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FooterSectionEditorProps {
  data: FooterSectionData;
  onChange: (newData: FooterSectionData) => void;
}

export default function FooterSectionEditor({ data, onChange }: FooterSectionEditorProps) {
  const handleChange = (field: keyof FooterSectionData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...data.social_links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onChange({ ...data, social_links: newLinks });
  };

  const handleAddSocialLink = () => {
    const newLink: SocialLink = { id: `social-${Date.now()}`, platform: 'Facebook', url: '#' };
    onChange({ ...data, social_links: [...data.social_links, newLink] });
  };

  const handleRemoveSocialLink = (index: number) => {
    const newLinks = data.social_links.filter((_, i) => i !== index);
    onChange({ ...data, social_links: newLinks });
  };
  
  const handleLegalLinkChange = (index: number, field: keyof FooterLink, value: string) => {
    const newLinks = [...data.legal_links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onChange({ ...data, legal_links: newLinks });
  };

  const handleAddLegalLink = () => {
    const newLink: FooterLink = { id: `legal-${Date.now()}`, text: 'Novo Link', url: '#' };
    onChange({ ...data, legal_links: [...data.legal_links, newLink] });
  };

  const handleRemoveLegalLink = (index: number) => {
    const newLinks = data.legal_links.filter((_, i) => i !== index);
    onChange({ ...data, legal_links: newLinks });
  };


  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor={`desc-${data.id}`}>Descrição da Marca</Label>
        <Textarea id={`desc-${data.id}`} value={data.brand_description} onChange={(e) => handleChange('brand_description', e.target.value)} />
      </div>

      <div className="space-y-4 border-t pt-4">
        <Label>Links de Redes Sociais</Label>
        {data.social_links.map((link, index) => (
            <div key={link.id} className="flex items-end gap-2 p-2 border rounded-md bg-background/50">
                <div className="grid grid-cols-2 gap-2 flex-grow">
                    <div className="space-y-1">
                        <Label htmlFor={`social-platform-${link.id}`} className="text-xs">Plataforma</Label>
                        <Select value={link.platform} onValueChange={(value) => handleSocialLinkChange(index, 'platform', value)}>
                            <SelectTrigger id={`social-platform-${link.id}`}><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Facebook">Facebook</SelectItem>
                                <SelectItem value="Instagram">Instagram</SelectItem>
                                <SelectItem value="Linkedin">Linkedin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor={`social-url-${link.id}`} className="text-xs">URL</Label>
                        <Input id={`social-url-${link.id}`} value={link.url} onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)} />
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleRemoveSocialLink(index)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        ))}
         <Button variant="outline" size="sm" onClick={handleAddSocialLink}><PlusCircle className="mr-2 h-4 w-4" />Adicionar Link Social</Button>
      </div>

      <div className="space-y-4 border-t pt-4">
        <Label>Links Legais</Label>
        {data.legal_links.map((link, index) => (
             <div key={link.id} className="flex items-end gap-2 p-2 border rounded-md bg-background/50">
                <div className="grid grid-cols-2 gap-2 flex-grow">
                     <div className="space-y-1">
                        <Label htmlFor={`legal-text-${link.id}`} className="text-xs">Texto</Label>
                        <Input id={`legal-text-${link.id}`} value={link.text} onChange={(e) => handleLegalLinkChange(index, 'text', e.target.value)} />
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor={`legal-url-${link.id}`} className="text-xs">URL</Label>
                        <Input id={`legal-url-${link.id}`} value={link.url} onChange={(e) => handleLegalLinkChange(index, 'url', e.target.value)} />
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleRemoveLegalLink(index)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        ))}
         <Button variant="outline" size="sm" onClick={handleAddLegalLink}><PlusCircle className="mr-2 h-4 w-4" />Adicionar Link Legal</Button>
      </div>
      
       <div className="space-y-2 border-t pt-4">
        <Label htmlFor={`copyright-${data.id}`}>Texto de Copyright</Label>
        <Input id={`copyright-${data.id}`} value={data.copyright_text} onChange={(e) => handleChange('copyright_text', e.target.value)} />
        <p className="text-xs text-muted-foreground">Pode usar `'{'{year}'}'` como placeholder para o ano atual.</p>
      </div>
    </div>
  );
}
