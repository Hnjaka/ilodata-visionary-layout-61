
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

interface FileUploaderProps {
  id: string;
  label: string;
  accept?: string;
  required?: boolean;
  existingFilePath?: string | null;
  onFileChange: (file: File | null) => void;
}

const TemplateFileUploader: React.FC<FileUploaderProps> = ({
  id,
  label,
  accept,
  required = false,
  existingFilePath,
  onFileChange,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileChange(selectedFile);
    }
  };

  return (
    <div>
      <Label htmlFor={id}>{label} {required && '*'}</Label>
      <div className="mt-1">
        <Input
          id={id}
          type="file"
          accept={accept}
          onChange={handleFileChange}
        />
      </div>
      {existingFilePath && !file && (
        <p className="mt-2 text-sm text-gray-500">
          Fichier actuel: {existingFilePath}
        </p>
      )}
      {file && (
        <p className="mt-2 text-sm text-gray-500">
          Nouveau fichier: {file.name}
        </p>
      )}
    </div>
  );
};

export default TemplateFileUploader;
