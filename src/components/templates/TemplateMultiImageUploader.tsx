
import React, { useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiImageUploaderProps {
  id: string;
  label: string;
  onImagesChange: (files: File[] | null) => void;
  onImageRemove: (index: number) => void;
  imagePreviews: string[];
}

const TemplateMultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  id,
  label,
  onImagesChange,
  onImageRemove,
  imagePreviews,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      onImagesChange(fileArray);
      // Clear input value to allow selecting the same file again
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label htmlFor={id} className="text-base font-medium">{label}</Label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={handleButtonClick}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          <span>Ajouter des images</span>
        </Button>
      </div>
      
      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {imagePreviews.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Image className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Aucune image téléchargée</p>
          <p className="mt-1 text-xs text-gray-400">Cliquez sur "Ajouter des images" pour télécharger des images d'aperçu</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {imagePreviews.map((preview, index) => (
            <div key={`${preview}-${index}`} className="relative group">
              <div className={cn(
                "aspect-square rounded-md overflow-hidden border",
                index === 0 ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-200"
              )}>
                <img 
                  src={preview} 
                  alt={`Preview ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                {index === 0 && (
                  <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br-md">
                    Principal
                  </div>
                )}
              </div>
              <Button 
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onImageRemove(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      {imagePreviews.length > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          La première image est utilisée comme aperçu principal.
          {imagePreviews.length > 1 && ' Vous pouvez supprimer les images en cliquant sur la croix.'}
        </p>
      )}
    </div>
  );
};

export default TemplateMultiImageUploader;
