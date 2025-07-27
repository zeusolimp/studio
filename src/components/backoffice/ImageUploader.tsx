
"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, Loader } from 'lucide-react';

interface ImageUploaderProps {
  currentImageUrl: string | null;
  onUploadSuccess: (url: string) => void;
  label: string;
}

export default function ImageUploader({ currentImageUrl, onUploadSuccess, label }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(currentImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Falha no upload do ficheiro');
      }
      
      onUploadSuccess(result.url);
      setPreview(result.url);
      toast({
        title: "Imagem carregada",
        description: "A nova imagem está agora ativa.",
      });

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro de Upload',
        description: error.message || 'Ocorreu um erro desconhecido.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-4">
        {preview ? (
          <div className="relative w-32 h-20 rounded-md overflow-hidden border">
            <Image src={preview} alt="Pré-visualização da imagem" fill sizes="128px" style={{ objectFit: 'cover' }} />
          </div>
        ) : (
          <div className="w-32 h-20 rounded-md bg-muted flex items-center justify-center text-sm text-muted-foreground">
            Sem Imagem
          </div>
        )}
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Upload className="mr-2 h-4 w-4" />
          )}
          {isUploading ? 'A carregar...' : 'Mudar Imagem'}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/gif, image/webp"
        />
      </div>
    </div>
  );
}
