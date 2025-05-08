
import React, { useState, useRef } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { BlogArticleFormValues } from './formSchema';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { uploadFile, getPublicFileUrl } from '@/utils/templateFileUtils';

interface ImageFieldProps {
  form: UseFormReturn<BlogArticleFormValues>;
}

export const ImageField: React.FC<ImageFieldProps> = ({ form }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      // Utiliser la fonction uploadFile pour télécharger l'image
      const fileName = await uploadFile(file, 'blog-images');
      
      // Obtenir l'URL publique de l'image
      const imageUrl = getPublicFileUrl('blog-images', fileName);
      
      // Mettre à jour le champ image avec l'URL de l'image
      if (imageUrl) {
        form.setValue('image', imageUrl);
        toast({
          title: "Succès",
          description: "Image importée avec succès"
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'importation de l'image:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'importer l'image. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      // Réinitialiser le champ de fichier pour permettre de sélectionner à nouveau le même fichier
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Image (URL)</FormLabel>
          <div className="flex space-x-2">
            <FormControl className="flex-grow">
              <Input placeholder="https://example.com/image.jpg" {...field} />
            </FormControl>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleImportClick} 
              disabled={isUploading}
              className="min-w-[120px]"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? "Importation..." : "Importer"}
            </Button>
          </div>
          <FormDescription>
            URL de l'image principale de l'article ou importez une image depuis votre appareil
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
