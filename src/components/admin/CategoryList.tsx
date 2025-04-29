
import React from 'react';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { CategoryType } from '@/types/guides';

interface CategoryListProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, setCategories }) => {
  // Handle deleting a category
  const handleDeleteCategory = (index: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette rubrique et tous ses articles ?')) {
      const updatedCategories = [...categories];
      updatedCategories.splice(index, 1);
      setCategories(updatedCategories);
      
      toast({
        title: "Supprimé",
        description: "La rubrique a été supprimée",
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>Nombre d'articles</TableHead>
          <TableHead className="w-24 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{category.title}</TableCell>
            <TableCell>{category.articles.length}</TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleDeleteCategory(index)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryList;
