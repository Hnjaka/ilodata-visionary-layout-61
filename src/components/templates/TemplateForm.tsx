
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Template = Tables<"templates">;

const templateSchema = z.object({
  titre: z.string().min(1, { message: "Le titre est requis" }),
  description: z.string().optional(),
  categorie: z.enum(['Livres', 'Magazines', 'CV', 'Flyers', 'Rapports']),
  tags: z.string().optional(),
  visible: z.boolean().default(true),
});

type FormValues = z.infer<typeof templateSchema>;

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

  const form = useForm<FormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      titre: '',
      description: '',
      categorie: 'Livres',
      tags: '',
      visible: true,
    },
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
        form.reset({
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTemplateImageFile(file);
      
      // Create preview for image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTemplateFile(file);
    }
  };

  const uploadFile = async (file: File, bucket: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }
    
    return fileName;
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      let imageFileName = existingImagePath;
      let templateFileName = existingFilePath;

      // Upload new image if provided
      if (templateImageFile) {
        imageFileName = await uploadFile(templateImageFile, 'template_images');
      }

      // Upload new template file if provided
      if (templateFile) {
        templateFileName = await uploadFile(templateFile, 'template_files');
      }

      // Check if template file exists for new templates
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

      let response;

      if (isEditing && id) {
        response = await supabase
          .from('templates')
          .update(templateData)
          .eq('id', id);
      } else {
        response = await supabase
          .from('templates')
          .insert([templateData]);
      }

      if (response.error) {
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
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du template",
        variant: "destructive",
      });
      console.error('Error saving template:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? 'Modifier le template' : 'Créer un nouveau template'}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="titre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Titre du template" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Description du template" 
                    rows={4} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categorie"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie *</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Livres">Livres</SelectItem>
                    <SelectItem value="Magazines">Magazines</SelectItem>
                    <SelectItem value="CV">CV</SelectItem>
                    <SelectItem value="Flyers">Flyers</SelectItem>
                    <SelectItem value="Rapports">Rapports</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Tags séparés par des virgules" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Label htmlFor="image_apercu">Image d'aperçu</Label>
            <div className="mt-1">
              <Input
                id="image_apercu"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Aperçu:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-auto rounded border"
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="fichier_template">Fichier template {!isEditing && '*'}</Label>
            <div className="mt-1">
              <Input
                id="fichier_template"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            {existingFilePath && !templateFile && (
              <p className="mt-2 text-sm text-gray-500">
                Fichier actuel: {existingFilePath}
              </p>
            )}
            {templateFile && (
              <p className="mt-2 text-sm text-gray-500">
                Nouveau fichier: {templateFile.name}
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name="visible"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Visible</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/admin/templates')}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Enregistrement...' : isEditing ? 'Mettre à jour' : 'Créer'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TemplateForm;
