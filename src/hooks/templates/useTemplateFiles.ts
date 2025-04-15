
import { useState } from 'react';

interface UseTemplateFilesResult {
  templateImageFile: File | null;
  templateFile: File | null;
  imagePreview: string | null;
  handleImageChange: (file: File | null) => void;
  handleFileChange: (file: File | null) => void;
}

export const useTemplateFiles = (initialImagePreview: string | null = null): UseTemplateFilesResult => {
  const [templateImageFile, setTemplateImageFile] = useState<File | null>(null);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialImagePreview);

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

  return {
    templateImageFile,
    templateFile,
    imagePreview,
    handleImageChange,
    handleFileChange
  };
};
