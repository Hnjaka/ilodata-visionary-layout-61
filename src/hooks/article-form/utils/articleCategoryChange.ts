
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

/**
 * Handles moving an article from one category to another
 */
export const handleArticleCategoryChange = async (
  updatedCategories: any[],
  oldCategoryIndex: number,
  newCategoryIndex: number,
  articleIndex: number,
  articleData: { 
    title: string, 
    slug: string, 
    content: string, 
    layout?: "standard" | "wide" | "sidebar" 
  }
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
  
  // Remove from old category if it exists
  if (updatedCategories[oldCategoryIndex].articles.length > articleIndex) {
    updatedCategories[oldCategoryIndex].articles.splice(articleIndex, 1);
  }
  
  // Add to new category
  updatedCategories[newCategoryIndex].articles.push({
    ...articleData,
    id: articleToMove.id
  });
};
