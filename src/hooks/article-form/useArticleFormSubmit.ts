
import { toast } from '@/components/ui/use-toast';
import { ArticleFormValues } from '@/components/admin/article-form/formSchema';
import { UseArticleFormProps } from './types';

export const useArticleFormSubmit = (props: UseArticleFormProps) => {
  const { 
    categories, 
    setCategories, 
    editArticle, 
    editArticleCategoryIndex, 
    editArticleIndex,
    setEditArticle,
    setEditArticleCategoryIndex,
    setEditArticleIndex
  } = props;

  // Handle adding/editing an article
  const onSubmit = (values: ArticleFormValues) => {
    const { title, slug, categoryIndex, content, layout } = values;
    
    // Validate categoryIndex
    if (categoryIndex === undefined || 
        categoryIndex < 0 || 
        categoryIndex >= categories.length) {
      toast({
        title: "Erreur",
        description: "Catégorie invalide",
        variant: "destructive"
      });
      return;
    }
    
    const updatedCategories = [...categories];

    if (editArticle && editArticleCategoryIndex !== null && editArticleIndex !== null) {
      // Handle article edit
      
      // Ensure the categories and articles arrays exist
      if (!updatedCategories[editArticleCategoryIndex]) {
        toast({
          title: "Erreur",
          description: "Catégorie invalide",
          variant: "destructive"
        });
        return;
      }
      
      if (!updatedCategories[editArticleCategoryIndex].articles) {
        updatedCategories[editArticleCategoryIndex].articles = [];
      }
      
      if (editArticleCategoryIndex !== categoryIndex) {
        // Moving to a different category
        handleArticleCategoryChange(
          updatedCategories,
          editArticleCategoryIndex,
          categoryIndex,
          editArticleIndex,
          { title, slug, content: content || '', layout }
        );
      } else {
        // Just update in the same category
        if (updatedCategories[categoryIndex].articles && 
            editArticleIndex < updatedCategories[categoryIndex].articles.length) {
          updatedCategories[categoryIndex].articles[editArticleIndex] = {
            title: title,
            slug: slug,
            content: content || '',
            layout: layout
          };
        }
      }
      
      toast({
        title: "Succès",
        description: "Article modifié",
      });
      
      // Reset edit mode
      setEditArticle(null);
      setEditArticleCategoryIndex(null);
      setEditArticleIndex(null);
      
    } else {
      // Add new article
      handleNewArticleCreation(
        updatedCategories,
        categoryIndex,
        { title, slug, content: content || '', layout }
      );
    }
    
    setCategories(updatedCategories);
    return categoryIndex; // Return for form reset
  };

  return onSubmit;
};

// Helper functions for article submission
const handleArticleCategoryChange = (
  updatedCategories: any[],
  oldCategoryIndex: number,
  newCategoryIndex: number,
  articleIndex: number,
  articleData: { title: string, slug: string, content: string, layout?: "standard" | "wide" | "sidebar" }
) => {
  // Ensure the target category exists and has an articles array
  if (!updatedCategories[newCategoryIndex]) {
    toast({
      title: "Erreur",
      description: "Catégorie cible invalide",
      variant: "destructive"
    });
    return;
  }
  
  // Ensure the target category's articles array exists
  if (!updatedCategories[newCategoryIndex].articles) {
    updatedCategories[newCategoryIndex].articles = [];
  }
  
  // Remove from old category if it exists
  if (updatedCategories[oldCategoryIndex].articles.length > articleIndex) {
    updatedCategories[oldCategoryIndex].articles.splice(articleIndex, 1);
  }
  
  // Add to new category
  updatedCategories[newCategoryIndex].articles.push(articleData);
};

const handleNewArticleCreation = (
  updatedCategories: any[],
  categoryIndex: number,
  articleData: { title: string, slug: string, content: string, layout?: "standard" | "wide" | "sidebar" }
) => {
  // Ensure the category exists
  if (!updatedCategories[categoryIndex]) {
    toast({
      title: "Erreur",
      description: "Catégorie invalide",
      variant: "destructive"
    });
    return;
  }
  
  // Ensure the category's articles array exists
  if (!updatedCategories[categoryIndex].articles) {
    updatedCategories[categoryIndex].articles = [];
  }
  
  updatedCategories[categoryIndex].articles.push(articleData);
  
  toast({
    title: "Succès",
    description: "Nouvel article ajouté",
  });
};
