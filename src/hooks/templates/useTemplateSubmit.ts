
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { uploadFile } from '@/utils/templateFileUtils';
import { FormValues } from '@/components/templates/TemplateFormFields';
import { useToast } from '@/hooks/use-toast';

interface UseTemplateSubmitProps {
  isEditing: boolean;
  id?: string;
}

interface UseTemplateSubmitResult {
  submitting: boolean;
  onSubmit: (
    values: FormValues, 
    templateImageFiles: File[], 
    templateFile: File | null,
    existingImagePaths: string[],
    existingFilePath: string | null
  ) => Promise<void>;
}

export const useTemplateSubmit = ({ 
  isEditing, 
  id 
}: UseTemplateSubmitProps): UseTemplateSubmitResult => {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (
    values: FormValues, 
    templateImageFiles: File[], 
    templateFile: File | null,
    existingImagePaths: string[],
    existingFilePath: string | null
  ) => {
    try {
      setSubmitting(true);
      
      let mainImagePath: string | null = existingImagePaths[0] || null;
      const extraImagePaths: string[] = [...existingImagePaths.slice(1)];
      let templateFileName = existingFilePath;

      // Upload new images if provided
      if (templateImageFiles.length > 0) {
        const uploadPromises = templateImageFiles.map(file => 
          uploadFile(file, 'template_images')
        );
        
        const newImagePaths = await Promise.all(uploadPromises);
        
        // Set the main image to the first uploaded image if no main image exists yet
        if (!mainImagePath && newImagePaths[0]) {
          mainImagePath = newImagePaths[0];
          
          // Add the rest to extra images
          extraImagePaths.push(...newImagePaths.slice(1).filter(Boolean) as string[]);
        } else {
          // Add all new images to extras
          extraImagePaths.push(...newImagePaths.filter(Boolean) as string[]);
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
        image_apercu: mainImagePath,
        image_extras: extraImagePaths.length > 0 ? JSON.stringify(extraImagePaths) : null,
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
      setSubmitting(false);
    }
  };

  return { submitting, onSubmit };
};
