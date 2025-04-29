
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

interface ArticleListProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

const ArticleList: React.FC<ArticleListProps> = ({ categories, setCategories }) => {
  // Handle deleting an article
  const handleDeleteArticle = (categoryIndex: number, articleIndex: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      const updatedCategories = [...categories];
      updatedCategories[categoryIndex].articles.splice(articleIndex, 1);
      setCategories(updatedCategories);
      
      toast({
        title: "Supprimé",
        description: "L'article a été supprimé",
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Rubrique</TableHead>
          <TableHead className="w-24 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.flatMap((category, categoryIndex) =>
          category.articles.map((article, articleIndex) => (
            <TableRow key={`${categoryIndex}-${articleIndex}`}>
              <TableCell className="font-medium">{article.title}</TableCell>
              <TableCell>{article.slug}</TableCell>
              <TableCell>{category.title}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeleteArticle(categoryIndex, articleIndex)}
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ArticleList;
