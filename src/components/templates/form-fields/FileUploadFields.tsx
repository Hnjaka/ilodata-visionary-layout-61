
import React from 'react';
import TemplateMultiImageUploader from '../TemplateMultiImageUploader';
import TemplateFileUploader from '../TemplateFileUploader';

interface FileUploadFieldsProps {
  onImagesChange: (files: File[] | null) => void;
  onFileChange: (file: File | null) => void;
  onImageRemove: (index: number) => void;
  existingImagePaths: string[];
  existingFilePath: string | null;
  imagePreviews: string[];
  isEditing: boolean;
}

const FileUploadFields: React.FC<FileUploadFieldsProps> = ({
  onImagesChange,
  onFileChange,
  onImageRemove,
  existingImagePaths,
  existingFilePath,
  imagePreviews,
  isEditing,
}) => {
  return (
    <>
      <TemplateMultiImageUploader
        id="image_apercu"
        label="Images d'aperçu"
        onImagesChange={onImagesChange}
        onImageRemove={onImageRemove}
        imagePreviews={imagePreviews}
      />

      <TemplateFileUploader
        id="fichier_template"
        label="Fichier template"
        required={!isEditing}
        existingFilePath={existingFilePath}
        onFileChange={onFileChange}
      />
    </>
  );
};

export default FileUploadFields;
