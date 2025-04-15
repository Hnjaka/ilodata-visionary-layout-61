
import { useState } from 'react';

interface UseTemplateFilesResult {
  templateImageFiles: File[];
  templateFile: File | null;
  imagePreviews: string[];
  handleImagesChange: (files: File[] | null) => void;
  handleFileChange: (file: File | null) => void;
  removeImage: (indexToRemove: number) => void;
}

export const useTemplateFiles = (initialImagePreviews: string[] = []): UseTemplateFilesResult => {
  const [templateImageFiles, setTemplateImageFiles] = useState<File[]>([]);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialImagePreviews);

  const handleImagesChange = (files: File[] | null) => {
    if (!files || files.length === 0) return;

    const newFiles = [...templateImageFiles, ...files];
    setTemplateImageFiles(newFiles);
    
    // Create previews for all new files
    const newPreviews = [...imagePreviews];
    
    for (const file of files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prevPreviews => [...prevPreviews, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setTemplateImageFiles(prevFiles => 
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
    setImagePreviews(prevPreviews => 
      prevPreviews.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleFileChange = (file: File | null) => {
    setTemplateFile(file);
  };

  return {
    templateImageFiles,
    templateFile,
    imagePreviews,
    handleImagesChange,
    handleFileChange,
    removeImage
  };
};
