
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTemplateForm } from '@/hooks/useTemplateForm';
import TemplateFormFields from './TemplateFormFields';

interface TemplateFormContainerProps {
  isEditing?: boolean;
  id?: string;
}

const TemplateFormContainer: React.FC<TemplateFormContainerProps> = ({ 
  isEditing = false,
  id 
}) => {
  const navigate = useNavigate();
  
  const {
    loading,
    defaultValues,
    imagePreviews,
    existingImagePaths,
    existingFilePath,
    handleImagesChange,
    removeImage,
    handleFileChange,
    onSubmit
  } = useTemplateForm({ id, isEditing });

  const handleCancel = () => {
    navigate('/admin/templates');
  };

  const handleFormSubmit = async (values: any) => {
    await onSubmit(values);
    navigate('/admin/templates');
  };

  if (loading && !defaultValues.titre) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <TemplateFormFields 
      defaultValues={defaultValues}
      onSubmit={handleFormSubmit}
      onImagesChange={handleImagesChange}
      onFileChange={handleFileChange}
      onImageRemove={removeImage}
      existingImagePaths={existingImagePaths}
      existingFilePath={existingFilePath}
      imagePreviews={imagePreviews}
      isSubmitting={loading}
      isEditing={isEditing}
      onCancel={handleCancel}
    />
  );
};

export default TemplateFormContainer;
