
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
  searchTerm: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, setCategories, searchTerm }) => {
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

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
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
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center py-6 text-slate-500">
              {searchTerm ? "Aucune rubrique trouvée pour cette recherche" : "Aucune rubrique disponible"}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CategoryList;
