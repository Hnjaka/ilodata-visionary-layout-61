
import { toast } from '@/hooks/use-toast';
import { ArticleFormValues } from '@/components/admin/article-form/formSchema';
import { UseArticleFormProps } from './types';
import { supabase } from '@/integrations/supabase/client';
import { handleArticleCategoryChange } from './utils/articleCategoryChange';
import { handleNewArticleCreation } from './utils/articleCreation';
import { validateCategoryIndex } from './utils/validation';

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
  const onSubmit = async (values: ArticleFormValues) => {
    const { title, slug, categoryIndex, content, layout } = values;
    
    // Validate categoryIndex
    if (!validateCategoryIndex(categoryIndex, categories)) {
      return categoryIndex;
    }
    
    const updatedCategories = [...categories];
    const selectedCategory = updatedCategories[categoryIndex!];

    try {
      if (editArticle && editArticleCategoryIndex !== null && editArticleIndex !== null) {
        // Handle article edit
        
        // Ensure the categories and articles arrays exist
        if (!updatedCategories[editArticleCategoryIndex]) {
          toast.error("Catégorie invalide");
          return categoryIndex;
        }
        
        if (!updatedCategories[editArticleCategoryIndex].articles) {
          updatedCategories[editArticleCategoryIndex].articles = [];
        }
        
        if (editArticleCategoryIndex !== categoryIndex) {
          // Moving to a different category
          await handleArticleCategoryChange(
            updatedCategories,
            editArticleCategoryIndex,
            categoryIndex!,
            editArticleIndex,
            { title, slug, content: content || '', layout }
          );
        } else {
          // Just update in the same category
          if (updatedCategories[categoryIndex!].articles && 
              editArticleIndex < updatedCategories[categoryIndex!].articles.length) {
            
            // Update in Supabase
            await supabase
              .from('guide_articles')
              .update({
                title,
                slug,
                content: content || '',
                layout,
                category_id: selectedCategory.id
              })
              .eq('id', editArticle.id);
              
            // Update in local state  
            updatedCategories[categoryIndex!].articles[editArticleIndex] = {
              ...editArticle,
              title: title,
              slug: slug,
              content: content || '',
              layout: layout
            };
          }
        }
        
        toast.success("Article modifié");
        
        // Reset edit mode
        setEditArticle(null);
        setEditArticleCategoryIndex(null);
        setEditArticleIndex(null);
        
      } else {
        // Add new article
        await handleNewArticleCreation(
          updatedCategories,
          categoryIndex!,
          { title, slug, content: content || '', layout }
        );
      }
      
      setCategories(updatedCategories);
      
      return categoryIndex; // Return for form reset
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error("Erreur lors de l'enregistrement de l'article");
      return categoryIndex;
    }
  };

  return onSubmit;
};
