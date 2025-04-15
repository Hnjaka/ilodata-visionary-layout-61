
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import TemplateFormFields, { FormValues } from './TemplateFormFields';
import { uploadFile } from '@/utils/templateFileUtils';
import { Button } from '@/components/ui/button';

type Template = Tables<"templates">;

const TemplateForm = ({ isEditing = false }: { isEditing?: boolean }) => {
  const { id } = useParams();
  const navigate = useNavigate();
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
          setImagePreview(`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${data.image_apercu}`);
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
  };

  const handleFileChange = (file: File | null) => {
    setTemplateFile(file);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      
      let imageFileName = existingImagePath;
      let templateFileName = existingFilePath;

      // Upload image if provided
      if (templateImageFile) {
        try {
          imageFileName = await uploadFile(templateImageFile, 'template_images');
          console.log("Image uploaded successfully:", imageFileName);
        } catch (error) {
          console.error("Error uploading image:", error);
          toast({
            title: "Erreur",
            description: "Impossible d'uploader l'image d'aperçu",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }

      // Upload template file if provided
      if (templateFile) {
        try {
          templateFileName = await uploadFile(templateFile, 'template_files');
          console.log("Template file uploaded successfully:", templateFileName);
        } catch (error) {
          console.error("Error uploading template file:", error);
          toast({
            title: "Erreur",
            description: "Impossible d'uploader le fichier template",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }

      // Validate required file for new templates
      if (!isEditing && !templateFileName) {
        toast({
          title: "Erreur",
          description: "Le fichier template est requis",
          variant: "destructive",
        });
        setLoading(false);
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

      navigate('/admin/templates');
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du template",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/templates');
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? 'Modifier le template' : 'Créer un nouveau template'}
      </h2>

      {loading && !defaultValues.titre ? (
        <div className="text-center py-8">Chargement...</div>
      ) : (
        <TemplateFormFields 
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          onImageChange={handleImageChange}
          onFileChange={handleFileChange}
          existingImagePath={existingImagePath}
          existingFilePath={existingFilePath}
          imagePreview={imagePreview}
          isSubmitting={loading}
          isEditing={isEditing}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default TemplateForm;
