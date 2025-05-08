import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/**
 * Handles moving an article from one category to another
 */
export const handleArticleCategoryChange = async (
  updatedCategories: any[],
  oldCategoryIndex: number,
  newCategoryIndex: number,
  articleIndex: number,
  articleData: { title: string, slug: string, content: string, layout?: string },
  showToast?: (message: string, type: "success" | "error") => void // Nouveau paramètre pour gérer les toasts
) => {
  // On ne peut pas utiliser useToast() en dehors d'un composant React
  // On reçoit donc une fonction de callback pour gérer les toasts

  // Ensure both categories exist
  if (!updatedCategories[oldCategoryIndex] || !updatedCategories[newCategoryIndex]) {
    if (showToast) showToast("Catégorie invalide", "error");
    return;
  }
  
  // Get the article from the old category
  const article = updatedCategories[oldCategoryIndex].articles[articleIndex];
  
  // Update in Supabase
  const { error } = await supabase
    .from('guide_articles')
    .update({
      title: articleData.title,
      slug: articleData.slug,
      content: articleData.content,
      layout: articleData.layout || 'standard',
      category_id: updatedCategories[newCategoryIndex].id
    })
    .eq('id', article.id);
    
  if (error) throw error;
    
  // Remove from old category
  updatedCategories[oldCategoryIndex].articles.splice(articleIndex, 1);
  
  // Ensure the destination category has an articles array
  if (!updatedCategories[newCategoryIndex].articles) {
    updatedCategories[newCategoryIndex].articles = [];
  }
  
  // Add to new category with updated data
  updatedCategories[newCategoryIndex].articles.push({
    ...article,
    title: articleData.title,
    slug: articleData.slug,
    content: articleData.content,
    layout: articleData.layout
  });
};
