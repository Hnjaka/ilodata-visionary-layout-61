
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getPublicFileUrl } from '@/utils/templateFileUtils';
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
  existingImagePath: string | null;
  existingFilePath: string | null;
  imagePreview: string | null;
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
  const [existingImagePath, setExistingImagePath] = useState<string | null>(null);
  const [existingFilePath, setExistingFilePath] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

        if (data.image_apercu) {
          setExistingImagePath(data.image_apercu);
          setImagePreview(getPublicFileUrl('template_images', data.image_apercu));
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
    existingImagePath,
    existingFilePath,
    imagePreview,
  };
};
