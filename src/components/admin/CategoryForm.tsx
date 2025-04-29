
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getIconByName } from '@/data/guidesData';
import { CategoryType } from '@/types/guides';

interface CategoryFormProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categories, setCategories }) => {
  // State for adding new categories
  const [newCategory, setNewCategory] = useState({ title: '', icon: 'Book' });

  // Available icons for selection
  const availableIcons = [
    'Book', 'FileText', 'Shapes', 'Printer', 'ImageIcon', 'PanelLeft', 'LayoutTemplate', 'FileCode'
  ];

  // Handle adding a new category
  const handleAddCategory = () => {
    if (!newCategory.title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre de la rubrique ne peut pas être vide",
        variant: "destructive"
      });
      return;
    }
    
    // Use getIconByName to get the actual component
    const IconComponent = getIconByName(newCategory.icon);
    
    const updatedCategories = [...categories, {
      title: newCategory.title,
      icon: IconComponent,
      articles: []
    }];
    
    setCategories(updatedCategories);
    setNewCategory({ title: '', icon: 'Book' });
    
    toast({
      title: "Succès",
      description: "Nouvelle rubrique ajoutée",
    });
  };

  return (
    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Ajouter une rubrique</h3>
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="categoryTitle">Titre de la rubrique</Label>
          <Input
            id="categoryTitle"
            value={newCategory.title}
            onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
            placeholder="Nouvelle rubrique"
          />
        </div>
        <div className="w-1/3">
          <Label htmlFor="categoryIcon">Icône</Label>
          <Select 
            value={newCategory.icon}
            onValueChange={(value) => setNewCategory({...newCategory, icon: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir une icône" />
            </SelectTrigger>
            <SelectContent>
              {availableIcons.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  {icon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddCategory}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>
    </div>
  );
};

export default CategoryForm;
