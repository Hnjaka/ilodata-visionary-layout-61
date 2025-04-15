
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { uploadFile, getPublicFileUrl } from '@/utils/templateFileUtils';
import { FormValues } from '@/components/templates/TemplateFormFields';
import { Tables } from '@/integrations/supabase/types';

type Template = Tables<"templates">;

interface UseTemplateFormProps {
  id?: string;
  isEditing: boolean;
}

interface UseTemplateFormReturn {
  loading: boolean;
  templateImageFile: File | null;
  templateFile: File | null;
  imagePreview: string | null;
  existingImagePath: string | null;
  existingFilePath: string | null;
  defaultValues: FormValues;
  handleImageChange: (file: File | null) => void;
  handleFileChange: (file: File | null) => void;
  onSubmit: (values: FormValues) => Promise<void>;
}

export const useTemplateForm = ({ id, isEditing }: UseTemplateFormProps): UseTemplateFormReturn => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [templateImageFile, setTemplateImageFile] = useState<File | null>(null);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImagePath, setExistingImagePath] = useState<string | null>(null);
  const [existingFilePath, setExistingFilePath] = useState<string | null>(null);
  const [defaultValues, setDefaultValues] = useState<FormValues>({
    titre: '',
    description: '',
    categorie: 'Livres',
    tags: '',
    visible: true,
  });

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

  const handleImageChange = (file: File | null) => {
    setTemplateImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (file: File | null) => {
    setTemplateFile(file);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      
      let imageFileName = existingImagePath;
      let templateFileName = existingFilePath;

      // Upload image if new file is provided
      if (templateImageFile) {
        imageFileName = await uploadFile(templateImageFile, 'template_images');
        if (!imageFileName) {
          throw new Error("Impossible d'uploader l'image d'aperçu");
        }
      }

      // Upload template file if new file is provided
      if (templateFile) {
        templateFileName = await uploadFile(templateFile, 'template_files');
        if (!templateFileName) {
          throw new Error("Impossible d'uploader le fichier template");
        }
      }

      // Validate required file for new templates
      if (!isEditing && !templateFileName) {
        toast({
          title: "Erreur",
          description: "Le fichier template est requis",
          variant: "destructive",
        });
        return;
      }

      const templateData = {
        titre: values.titre,
        description: values.description,
        categorie: values.categorie,
        tags: values.tags,
        visible: values.visible,
        image_apercu: imageFileName,
        fichier_template: templateFileName,
      };

      console.log("Saving template with data:", templateData);
      
      let response;

      if (isEditing && id) {
        response = await supabase
          .from('templates')
          .update(templateData)
          .eq('id', id);
      } else {
        response = await supabase
          .from('templates')
          .insert([{ ...templateData, date_ajout: new Date().toISOString() }]);
      }

      if (response.error) {
        console.error("Database error:", response.error);
        throw response.error;
      }

      toast({
        title: "Succès",
        description: isEditing 
          ? "Le template a été mis à jour avec succès" 
          : "Le template a été créé avec succès",
      });

      return Promise.resolve();
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du template",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    templateImageFile,
    templateFile,
    imagePreview,
    existingImagePath,
    existingFilePath,
    defaultValues,
    handleImageChange,
    handleFileChange,
    onSubmit
  };
};
