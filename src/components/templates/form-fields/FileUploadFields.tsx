
import React from 'react';
import TemplateImageUploader from '../TemplateImageUploader';
import TemplateFileUploader from '../TemplateFileUploader';

interface FileUploadFieldsProps {
  onImageChange: (file: File | null) => void;
  onFileChange: (file: File | null) => void;
  existingImagePath: string | null;
  existingFilePath: string | null;
  imagePreview: string | null;
  isEditing: boolean;
}

const FileUploadFields: React.FC<FileUploadFieldsProps> = ({
  onImageChange,
  onFileChange,
  existingImagePath,
  existingFilePath,
  imagePreview,
  isEditing,
}) => {
  return (
    <>
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
    </>
  );
};

export default FileUploadFields;
