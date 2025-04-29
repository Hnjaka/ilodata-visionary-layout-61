
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
import { CategoryType } from '@/types/guides';

interface ArticleListProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  searchTerm: string;
  onEditArticle: (article: any, categoryIndex: number, articleIndex: number) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ 
  categories, 
  setCategories, 
  searchTerm,
  onEditArticle
}) => {
  // Handle deleting an article
  const handleDeleteArticle = (categoryIndex: number, articleIndex: number) => {
    if (!categories[categoryIndex] || !categories[categoryIndex].articles) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'article",
        variant: "destructive"
      });
      return;
    }

    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      const updatedCategories = [...categories];
      if (updatedCategories[categoryIndex]?.articles) {
        updatedCategories[categoryIndex].articles.splice(articleIndex, 1);
        setCategories(updatedCategories);
        
        toast({
          title: "Supprimé",
          description: "L'article a été supprimé",
        });
      }
    }
  };

  // Filter articles based on search term
  const filteredArticles = (categories || [])
    .filter(category => category && Array.isArray(category.articles)) // Only include categories that exist and have articles array
    .flatMap((category, categoryIndex) =>
      category.articles
        .filter(article => article && ( // Ensure article exists before accessing properties
          ((article.title || '').toLowerCase().includes((searchTerm || '').toLowerCase())) ||
          ((article.slug || '').toLowerCase().includes((searchTerm || '').toLowerCase())) ||
          ((category.title || '').toLowerCase().includes((searchTerm || '').toLowerCase())) ||
          ((article.content || '').toLowerCase().includes((searchTerm || '').toLowerCase()))
        ))
        .map((article, articleIndex) => ({
          article,
          categoryIndex,
          articleIndex,
          categoryTitle: category.title || ''
        }))
    );

  // Function to truncate content for display
  const truncateContent = (content: string | undefined, maxLength: number = 100) => {
    if (!content) return '–';
    return content.length > maxLength 
      ? `${content.substring(0, maxLength)}...` 
      : content;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Rubrique</TableHead>
          <TableHead>Mise en page</TableHead>
          <TableHead>Contenu</TableHead>
          <TableHead className="w-32 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredArticles.length > 0 ? (
          filteredArticles.map(({ article, categoryIndex, articleIndex, categoryTitle }) => (
            <TableRow key={`${categoryIndex}-${articleIndex}`}>
              <TableCell className="font-medium">{article?.title || ''}</TableCell>
              <TableCell>{article?.slug || ''}</TableCell>
              <TableCell>{categoryTitle}</TableCell>
              <TableCell>{article?.layout || 'Standard'}</TableCell>
              <TableCell className="max-w-xs truncate">
                {truncateContent(article?.content)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEditArticle(article, categoryIndex, articleIndex)}
                  >
                    <Edit className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteArticle(categoryIndex, articleIndex)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-slate-500">
              {searchTerm ? "Aucun article trouvé pour cette recherche" : "Aucun article disponible"}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ArticleList;
