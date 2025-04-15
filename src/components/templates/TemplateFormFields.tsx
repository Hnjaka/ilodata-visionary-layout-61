
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TemplateImageUploader from './TemplateImageUploader';
import TemplateFileUploader from './TemplateFileUploader';

export const templateSchema = z.object({
  titre: z.string().min(1, { message: "Le titre est requis" }),
  description: z.string().optional(),
  categorie: z.enum(['Livres', 'Magazines', 'CV', 'Flyers', 'Rapports']),
  tags: z.string().optional(),
  visible: z.boolean().default(true),
});

export type FormValues = z.infer<typeof templateSchema>;

export interface TemplateFormFieldsProps {
  defaultValues: FormValues;
  onSubmit: (values: FormValues) => void;
  onImageChange: (file: File | null) => void;
  onFileChange: (file: File | null) => void;
  existingImagePath: string | null;
  existingFilePath: string | null;
  imagePreview: string | null;
  isSubmitting: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

const TemplateFormFields: React.FC<TemplateFormFieldsProps> = ({
  defaultValues,
  onSubmit,
  onImageChange,
  onFileChange,
  existingImagePath,
  existingFilePath,
  imagePreview,
  isSubmitting,
  isEditing,
  onCancel,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues,
  });

  return (
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

        <TemplateImageUploader
          id="image_apercu"
          label="Image d'aperçu"
          onImageChange={onImageChange}
          existingImagePath={existingImagePath}
          imagePreview={imagePreview}
        />

        <TemplateFileUploader
          id="fichier_template"
          label="Fichier template"
          required={!isEditing}
          existingFilePath={existingFilePath}
          onFileChange={onFileChange}
        />

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
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Annuler
          </button>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enregistrement...' : isEditing ? 'Mettre à jour' : 'Créer'}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default TemplateFormFields;
