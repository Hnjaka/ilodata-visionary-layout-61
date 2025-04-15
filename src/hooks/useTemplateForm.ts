
import { useEffect } from 'react';
import { useFetchTemplate } from './templates/useFetchTemplate';
import { useTemplateFiles } from './templates/useTemplateFiles';
import { useTemplateSubmit } from './templates/useTemplateSubmit';
import { FormValues } from '@/components/templates/TemplateFormFields';

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
  const { 
    loading, 
    defaultValues, 
    existingImagePath, 
    existingFilePath, 
    imagePreview: fetchedImagePreview 
  } = useFetchTemplate({ id, isEditing });

  const { 
    templateImageFile, 
    templateFile, 
    imagePreview, 
    handleImageChange, 
    handleFileChange 
  } = useTemplateFiles(fetchedImagePreview);

  const { submitting, onSubmit: submitTemplate } = useTemplateSubmit({ isEditing, id });

  // Sync imagePreview when it changes in useFetchTemplate
  useEffect(() => {
    if (fetchedImagePreview) {
      handleImageChange(null);  // Reset the file but keep the preview
    }
  }, [fetchedImagePreview]);

  // Wrap the submit function to provide the current file states
  const onSubmit = async (values: FormValues) => {
    return submitTemplate(
      values,
      templateImageFile,
      templateFile,
      existingImagePath,
      existingFilePath
    );
  };

  return {
    loading: loading || submitting,
    templateImageFile,
    templateFile,
    imagePreview: imagePreview || fetchedImagePreview,
    existingImagePath,
    existingFilePath,
    defaultValues,
    handleImageChange,
    handleFileChange,
    onSubmit
  };
};
