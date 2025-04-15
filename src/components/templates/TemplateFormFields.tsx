
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import BasicInfoFields from './form-fields/BasicInfoFields';
import CategoryTagFields from './form-fields/CategoryTagFields';
import VisibilityField from './form-fields/VisibilityField';
import FileUploadFields from './form-fields/FileUploadFields';
import TemplateFormButtons from './TemplateFormButtons';

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
  onImagesChange: (files: File[] | null) => void;
  onFileChange: (file: File | null) => void;
  onImageRemove: (index: number) => void;
  existingImagePaths: string[];
  existingFilePath: string | null;
  imagePreviews: string[];
  isSubmitting: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

const TemplateFormFields: React.FC<TemplateFormFieldsProps> = ({
  defaultValues,
  onSubmit,
  onImagesChange,
  onFileChange,
  onImageRemove,
  existingImagePaths,
  existingFilePath,
  imagePreviews,
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
        <BasicInfoFields form={form} />
        
        <CategoryTagFields form={form} />
        
        <FileUploadFields
          onImagesChange={onImagesChange}
          onFileChange={onFileChange}
          onImageRemove={onImageRemove}
          existingImagePaths={existingImagePaths}
          existingFilePath={existingFilePath}
          imagePreviews={imagePreviews}
          isEditing={isEditing}
        />
        
        <VisibilityField form={form} />

        <TemplateFormButtons 
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
};

export default TemplateFormFields;
