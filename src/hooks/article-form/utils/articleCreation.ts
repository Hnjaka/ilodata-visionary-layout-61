import { supabase } from '@/integrations/supabase/client';

/**
 * Handles creating a new article in the specified category
 */
export const handleNewArticleCreation = async (
  updatedCategories: any[],
  categoryIndex: number,
  articleData: { 
    title: string, 
    slug: string, 
    content: string, 
    layout?: "standard" | "wide" | "sidebar" 
  },
  showToast?: (message: string, type: "success" | "error") => void // Nouveau paramètre pour gérer les toasts
) => {
  // Ensure the category exists
  if (!updatedCategories[categoryIndex]) {
    if (showToast) showToast("Catégorie invalide", "error");
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
  
  if (showToast) showToast("Nouvel article ajouté", "success");
};
