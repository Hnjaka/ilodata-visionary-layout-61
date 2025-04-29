
import { toast } from '@/components/ui/use-toast';
import { ArticleFormValues } from '@/components/admin/article-form/formSchema';
import { UseArticleFormProps } from './types';
import { supabase } from '@/integrations/supabase/client';
import { getIconName } from '@/data/guidesData';

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

    try {
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
          await handleArticleCategoryChange(
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

            // Sync with Supabase
            await supabase
              .from('guide_articles')
              .update({
                title,
                slug,
                content: content || '',
                layout,
                category_id: updatedCategories[categoryIndex].id
              })
              .eq('id', editArticle.id);
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
        await handleNewArticleCreation(
          updatedCategories,
          categoryIndex,
          { title, slug, content: content || '', layout }
        );
      }
      
      setCategories(updatedCategories);

      // Save all categories to Supabase (this is a simplified approach)
      // In a more sophisticated system, we would handle incremental updates
      await saveCategoriesDataToSupabase(updatedCategories);
      
      return categoryIndex; // Return for form reset
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'enregistrement de l'article",
        variant: "destructive"
      });
      return categoryIndex;
    }
  };

  return onSubmit;
};

// Helper functions for article submission
const handleArticleCategoryChange = async (
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
  
  // Get article to move
  const articleToMove = updatedCategories[oldCategoryIndex].articles[articleIndex];
  
  // Remove from old category if it exists
  if (updatedCategories[oldCategoryIndex].articles.length > articleIndex) {
    updatedCategories[oldCategoryIndex].articles.splice(articleIndex, 1);
  }
  
  // Add to new category
  updatedCategories[newCategoryIndex].articles.push(articleData);

  // Update in Supabase
  if (articleToMove && articleToMove.id) {
    await supabase
      .from('guide_articles')
      .update({
        title: articleData.title,
        slug: articleData.slug,
        content: articleData.content,
        layout: articleData.layout,
        category_id: updatedCategories[newCategoryIndex].id
      })
      .eq('id', articleToMove.id);
  }
};

const handleNewArticleCreation = async (
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
  
  // Insert in Supabase
  const { data: newArticle, error } = await supabase
    .from('guide_articles')
    .insert({
      title: articleData.title,
      slug: articleData.slug,
      content: articleData.content,
      layout: articleData.layout || 'standard',
      category_id: updatedCategories[categoryIndex].id
    })
    .select()
    .single();

  if (error) {
    throw error;
  }
  
  // Add the article with the ID from Supabase
  updatedCategories[categoryIndex].articles.push({
    ...articleData,
    id: newArticle.id
  });
  
  toast({
    title: "Succès",
    description: "Nouvel article ajouté",
  });
};

// Function to save all categories data
const saveCategoriesDataToSupabase = async (categories: any[]) => {
  // This is a simplified approach
  // In a real-world scenario, you would handle incremental updates
  for (const category of categories) {
    // Update or create category
    const iconName = getIconName(category.icon);
    
    if (category.id) {
      // Update existing category
      await supabase
        .from('guide_categories')
        .update({
          title: category.title,
          icon: iconName
        })
        .eq('id', category.id);
    } else {
      // Create new category
      const { data: newCategory, error } = await supabase
        .from('guide_categories')
        .insert({
          title: category.title,
          icon: iconName
        })
        .select()
        .single();
        
      if (!error && newCategory) {
        category.id = newCategory.id;
      }
    }
  }
};
