
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
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { BlogCategory, BlogArticle } from '@/hooks/useBlogData';
import { supabase } from '@/integrations/supabase/client';

interface BlogArticleListProps {
  categories: BlogCategory[];
  setCategories: React.Dispatch<React.SetStateAction<BlogCategory[]>>;
  searchTerm: string;
  onEditArticle: (article: BlogArticle, categoryIndex: number, articleIndex: number) => void;
}

const BlogArticleList: React.FC<BlogArticleListProps> = ({ 
  categories, 
  setCategories, 
  searchTerm,
  onEditArticle
}) => {
  // Handle deleting an article
  const handleDeleteArticle = async (categoryIndex: number, articleIndex: number) => {
    if (!categories[categoryIndex] || !categories[categoryIndex].articles) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'article",
        variant: "destructive"
      });
      return;
    }

    const article = categories[categoryIndex].articles[articleIndex];
    
    if (!article?.id) {
      toast({
        title: "Erreur",
        description: "Identifiant de l'article manquant",
        variant: "destructive"
      });
      return;
    }

    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        // Delete from Supabase first
        const { error } = await supabase
          .from('blog_articles')
          .delete()
          .eq('id', article.id);
        
        if (error) throw error;
        
        // If successful, update the local state
        const updatedCategories = [...categories];
        if (updatedCategories[categoryIndex]?.articles) {
          updatedCategories[categoryIndex].articles.splice(articleIndex, 1);
          setCategories(updatedCategories);
          
          toast({
            title: "Supprimé",
            description: "L'article a été supprimé",
          });
        }
      } catch (error) {
        console.error('Error deleting article:', error);
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression de l'article",
          variant: "destructive"
        });
      }
    }
  };

  // Filter articles based on search term
  const filteredArticles = (categories || [])
    .filter(category => category && Array.isArray(category.articles))
    .flatMap((category, categoryIndex) =>
      (category.articles || [])
        .filter((article) => {
          if (!article) return false;
          const searchTermLower = (searchTerm || '').toLowerCase();
          return (
            ((article.title || '').toLowerCase().includes(searchTermLower)) ||
            ((article.slug || '').toLowerCase().includes(searchTermLower)) ||
            ((category.title || '').toLowerCase().includes(searchTermLower)) ||
            ((article.excerpt || '').toLowerCase().includes(searchTermLower)) ||
            ((article.content || '').toLowerCase().includes(searchTermLower))
          );
        })
        .map((article, articleIndex) => ({
          article,
          categoryIndex,
          articleIndex,
          categoryTitle: category.title || ''
        }))
    );

  // Function to format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Non publié';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  // Function to truncate text
  const truncateText = (text: string | undefined, maxLength: number = 100) => {
    if (!text) return '–';
    return text.length > maxLength 
      ? `${text.substring(0, maxLength)}...` 
      : text;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Extrait</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-32 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredArticles.length > 0 ? (
          filteredArticles.map(({ article, categoryIndex, articleIndex, categoryTitle }) => (
            <TableRow key={`${categoryIndex}-${articleIndex}`}>
              <TableCell className="font-medium">{article.title || ''}</TableCell>
              <TableCell>{article.slug || ''}</TableCell>
              <TableCell>{categoryTitle}</TableCell>
              <TableCell className="max-w-xs truncate">
                {truncateText(article.excerpt)}
              </TableCell>
              <TableCell>
                {article.published ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Publié ({formatDate(article.published_at)})
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Brouillon
                  </Badge>
                )}
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

export default BlogArticleList;
