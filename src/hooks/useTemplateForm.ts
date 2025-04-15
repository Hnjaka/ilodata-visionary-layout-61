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
  templateImageFiles: File[];
  templateFile: File | null;
  imagePreviews: string[];
  existingImagePaths: string[];
  existingFilePath: string | null;
  defaultValues: FormValues;
  handleImagesChange: (files: File[] | null) => void;
  removeImage: (indexToRemove: number) => void;
  handleFileChange: (file: File | null) => void;
  onSubmit: (values: FormValues) => Promise<void>;
}

export const useTemplateForm = ({ id, isEditing }: UseTemplateFormProps): UseTemplateFormReturn => {
  const { 
    loading, 
    defaultValues, 
    existingImagePaths, 
    existingFilePath, 
    imagePreviews: fetchedImagePreviews 
  } = useFetchTemplate({ id, isEditing });

  const { 
    templateImageFiles, 
    templateFile, 
    imagePreviews, 
    handleImagesChange, 
    handleFileChange,
    removeImage 
  } = useTemplateFiles(fetchedImagePreviews);

  const { submitting, onSubmit: submitTemplate } = useTemplateSubmit({ isEditing, id });

  // Sync imagePreviews when they change in useFetchTemplate
  useEffect(() => {
    if (fetchedImagePreviews.length > 0) {
      // We keep any existing file uploads but update the previews
    }
  }, [fetchedImagePreviews]);

  // Wrap the submit function to provide the current file states
  const onSubmit = async (values: FormValues) => {
    return submitTemplate(
      values,
      templateImageFiles,
      templateFile,
      existingImagePaths,
      existingFilePath
    );
  };

  return {
    loading: loading || submitting,
    templateImageFiles,
    templateFile,
    imagePreviews: imagePreviews.length > 0 ? imagePreviews : fetchedImagePreviews,
    existingImagePaths,
    existingFilePath,
    defaultValues,
    handleImagesChange,
    removeImage,
    handleFileChange,
    onSubmit
  };
};
