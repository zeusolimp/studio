
"use client";

import { useState } from 'react';
import type { SiteSettings, ContactInfo, ThemeColors } from '@/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ImageUploader from './ImageUploader';
import { Save, Loader } from 'lucide-react';
import ColorPicker from './ColorPicker';

interface SettingsEditorProps {
    initialSettings: SiteSettings;
}

export default function SettingsEditor({ initialSettings }: SettingsEditorProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!response.ok) {
        throw new Error('Falha ao guardar as configurações');
      }
      toast({
        title: "Sucesso!",
        description: "As suas configurações foram guardadas. Serão aplicadas na próxima atualização da página.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível guardar as configurações. Por favor, tente novamente.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setSettings(prev => ({
        ...prev,
        contact: {
            ...prev.contact,
            [field]: value,
        }
    }));
  };

  const handleColorChange = (theme: 'light' | 'dark', colorName: keyof ThemeColors, value: string) => {
    setSettings(prev => ({
        ...prev,
        theme: {
            ...prev.theme,
            [theme]: {
                ...prev.theme[theme],
                [colorName]: value
            }
        }
    }))
  }

  const handleLogoUpload = (url: string) => {
    setSettings(prev => ({ ...prev, logo_url: url }));
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <h1 className="text-3xl font-headline">Configurações do Site</h1>
        <Button onClick={handleSave} disabled={isSaving} size="lg">
            {isSaving ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isSaving ? 'A guardar...' : 'Guardar Configurações'}
        </Button>
      </div>
      
      <div className="space-y-6">
          <Card>
            <CardHeader>
                <CardTitle>Logo</CardTitle>
                <CardDescription>Carregue o logo do seu site. Ele aparecerá na barra de navegação.</CardDescription>
            </CardHeader>
            <CardContent>
                <ImageUploader 
                    label="Logo do Site"
                    currentImageUrl={settings.logo_url}
                    onUploadSuccess={handleLogoUpload}
                />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>Informações de Contacto</CardTitle>
                <CardDescription>Esta informação será exibida no rodapé e nas páginas de contacto.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="email">Email de Contacto</Label>
                    <Input id="email" value={settings.contact.email} onChange={(e) => handleContactChange('email', e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="phone">Telefone de Contacto</Label>
                    <Input id="phone" value={settings.contact.phone} onChange={(e) => handleContactChange('phone', e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="address">Morada de Contacto</Label>
                    <Input id="address" value={settings.contact.address} onChange={(e) => handleContactChange('address', e.target.value)} />
                </div>
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
                <CardTitle>Cores do Tema</CardTitle>
                <CardDescription>Personalize a paleta de cores para os temas claro e escuro do seu site. Forneça valores HSL (ex: 222 47% 11%).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-medium mb-4 text-lg">Tema Claro</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ColorPicker label="Fundo" color={settings.theme.light.background} onChange={(color) => handleColorChange('light', 'background', color)} />
                        <ColorPicker label="Texto" color={settings.theme.light.foreground} onChange={(color) => handleColorChange('light', 'foreground', color)} />
                        <ColorPicker label="Destaque" color={settings.theme.light.accent} onChange={(color) => handleColorChange('light', 'accent', color)} />
                    </div>
                </div>
                 <div>
                    <h3 className="font-medium mb-4 text-lg">Tema Escuro</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ColorPicker label="Fundo" color={settings.theme.dark.background} onChange={(color) => handleColorChange('dark', 'background', color)} />
                        <ColorPicker label="Texto" color={settings.theme.dark.foreground} onChange={(color) => handleColorChange('dark', 'foreground', color)} />
                        <ColorPicker label="Destaque" color={settings.theme.dark.accent} onChange={(color) => handleColorChange('dark', 'accent', color)} />
                    </div>
                </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
