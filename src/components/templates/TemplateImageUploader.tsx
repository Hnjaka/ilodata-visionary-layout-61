
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ImageUploaderProps {
  id: string;
  label: string;
  onImageChange: (file: File | null) => void;
  existingImagePath?: string | null;
  imagePreview?: string | null;
}

const TemplateImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  label,
  onImageChange,
  existingImagePath,
  imagePreview: initialImagePreview,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialImagePreview || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      onImageChange(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-1">
        <Input
          id={id}
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
  );
};

export default TemplateImageUploader;
