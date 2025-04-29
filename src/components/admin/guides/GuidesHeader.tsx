
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { CategoryType } from '@/types/guides';

interface GuidesHeaderProps {
  categories: CategoryType[];
}

const GuidesHeader: React.FC<GuidesHeaderProps> = ({ categories }) => {
  // Export the data structure
  const handleExportData = () => {
    const dataStr = JSON.stringify(categories, null, 2);
    console.log(dataStr);
    navigator.clipboard.writeText(dataStr).then(() => {
      toast({
        title: "Exporté",
        description: "Structure JSON copiée dans le presse-papier",
      });
    });
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-slate-800">Gestion des rubriques et articles</h1>
      <Button onClick={handleExportData} variant="outline">
        Exporter en JSON
      </Button>
    </div>
  );
};

export default GuidesHeader;
