
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { BlogArticleFormValues } from './formSchema';
import { Wand } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ImageFieldProps {
  form: UseFormReturn<BlogArticleFormValues>;
}

export const ImageField: React.FC<ImageFieldProps> = ({ form }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async () => {
    try {
      setIsGenerating(true);
      
      // Récupérer le titre et le résumé pour la génération
      const title = form.getValues('title');
      const excerpt = form.getValues('excerpt');
      
      if (!title) {
        toast({
          title: "Attention",
          description: "Veuillez d'abord saisir un titre pour générer une image",
          variant: "destructive"
        });
        return;
      }
      
      // Construire le prompt pour la génération d'image
      const prompt = `${title}${excerpt ? ` - ${excerpt}` : ''}`;
      
      // Appel à l'API Supabase Edge Function pour générer l'image
      const { data, error } = await supabase.functions.invoke('generate-blog-image', {
        body: { prompt }
      });
      
      if (error || !data.imageUrl) {
        throw new Error(error?.message || "Erreur lors de la génération de l'image");
      }
      
      // Mettre à jour le champ image avec l'URL générée
      form.setValue('image', data.imageUrl);
      
      toast({
        title: "Succès",
        description: "Image générée avec succès"
      });
      
    } catch (error) {
      console.error("Erreur lors de la génération d'image:", error);
      toast({
        title: "Erreur",
        description: "Impossible de générer l'image. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
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
            <Button 
              type="button" 
              variant="outline" 
              onClick={generateImage} 
              disabled={isGenerating}
              className="min-w-[120px]"
            >
              <Wand className="h-4 w-4 mr-2" />
              {isGenerating ? "Génération..." : "Générer"}
            </Button>
          </div>
          <FormDescription>
            URL de l'image principale de l'article ou générez-en une avec l'IA
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
