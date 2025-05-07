
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getPublicFileUrl } from '@/utils/templateFileUtils';
import { getImageUrl } from '@/utils/templateUrlUtils';
import { FormValues } from '@/components/templates/TemplateFormFields';
import { Tables } from '@/integrations/supabase/types';

type Template = Tables<"templates">;

interface UseFetchTemplateProps {
  id?: string;
  isEditing: boolean;
}

interface FetchTemplateResult {
  loading: boolean;
  defaultValues: FormValues;
  existingImagePaths: string[];
  existingFilePath: string | null;
  imagePreviews: string[];
}

export const useFetchTemplate = ({ id, isEditing }: UseFetchTemplateProps): FetchTemplateResult => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState<FormValues>({
    titre: '',
    description: '',
    categorie: 'Livres',
    tags: '',
    visible: true,
  });
  const [existingImagePaths, setExistingImagePaths] = useState<string[]>([]);
  const [existingFilePath, setExistingFilePath] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (isEditing && id) {
      fetchTemplate(id);
    }
  }, [isEditing, id]);

  const fetchTemplate = async (templateId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('id', templateId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setDefaultValues({
          titre: data.titre,
          description: data.description || '',
          categorie: data.categorie,
          tags: data.tags || '',
          visible: data.visible || false,
        });

        // Handle the main image_apercu field
        if (data.image_apercu) {
          const mainImagePath = data.image_apercu;
          const mainImagePaths = [mainImagePath];
          setExistingImagePaths(mainImagePaths);
          
          // Utiliser getImageUrl pour obtenir l'URL correcte
          const mainImageUrl = getImageUrl(mainImagePath);
          setImagePreviews(mainImageUrl ? [mainImageUrl] : []);

          // If there are additional images in the image_extras field (JSON array of paths)
          if (data.image_extras) {
            try {
              const extraImagePaths = JSON.parse(data.image_extras);
              if (Array.isArray(extraImagePaths)) {
                const updatedImagePaths = [...mainImagePaths, ...extraImagePaths];
                setExistingImagePaths(updatedImagePaths);
                
                // Utiliser getImageUrl pour chaque image supplémentaire
                const extraImagePreviews = extraImagePaths.map(path => getImageUrl(path)).filter(Boolean);
                setImagePreviews(prev => [...prev, ...extraImagePreviews as string[]]);
              }
            } catch (parseError) {
              console.error('Error parsing image_extras:', parseError);
            }
          }
        }

        if (data.fichier_template) {
          setExistingFilePath(data.fichier_template);
        }
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger le template",
        variant: "destructive",
      });
      console.error('Error fetching template:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    defaultValues,
    existingImagePaths,
    existingFilePath,
    imagePreviews,
  };
};
