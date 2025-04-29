
import React from 'react';
import { Trash, Edit } from 'lucide-react';
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
import { BlogCategory } from '@/hooks/useBlogData';
import { supabase } from '@/integrations/supabase/client';

interface BlogCategoryListProps {
  categories: BlogCategory[];
  setCategories: React.Dispatch<React.SetStateAction<BlogCategory[]>>;
  searchTerm: string;
  onEditCategory: (category: BlogCategory, index: number) => void;
}

const BlogCategoryList: React.FC<BlogCategoryListProps> = ({ 
  categories, 
  setCategories, 
  searchTerm,
  onEditCategory
}) => {
  // Handle deleting a category
  const handleDeleteCategory = async (categoryIndex: number) => {
    const category = categories[categoryIndex];
    
    if (!category?.id) {
      toast({
        title: "Erreur",
        description: "Identifiant de la catégorie manquant",
        variant: "destructive"
      });
      return;
    }
    
    // Check if category has articles
    if (category.articles && category.articles.length > 0) {
      toast({
        title: "Action impossible",
        description: "Supprimez d'abord tous les articles de cette catégorie",
        variant: "destructive"
      });
      return;
    }

    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        // Delete from Supabase first
        const { error } = await supabase
          .from('blog_categories')
          .delete()
          .eq('id', category.id);
        
        if (error) throw error;
        
        // If successful, update the local state
        const updatedCategories = [...categories];
        updatedCategories.splice(categoryIndex, 1);
        setCategories(updatedCategories);
        
        toast({
          title: "Supprimée",
          description: "La catégorie a été supprimée",
        });
      } catch (error) {
        console.error('Error deleting category:', error);
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression de la catégorie",
          variant: "destructive"
        });
      }
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => {
    return category.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Catégorie</TableHead>
          <TableHead>Articles</TableHead>
          <TableHead className="w-32 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.title}</TableCell>
              <TableCell>{category.articles?.length || 0}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEditCategory(category, index)}
                  >
                    <Edit className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteCategory(index)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center py-6 text-slate-500">
              {searchTerm ? "Aucune catégorie trouvée pour cette recherche" : "Aucune catégorie disponible"}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default BlogCategoryList;
