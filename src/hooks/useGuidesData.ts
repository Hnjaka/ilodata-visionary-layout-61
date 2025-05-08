import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { CategoryType, ArticleType } from '@/types/guides';

export const useGuidesData = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGuidesData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('guide_categories')
          .select('*')
          .order('position', { ascending: true });

        if (categoriesError) {
          throw categoriesError;
        }

        if (!categoriesData) {
          throw new Error("Failed to fetch guide categories");
        }

        // Fetch articles for each category
        const categoriesWithArticles = await Promise.all(
          categoriesData.map(async (category) => {
            const { data: articlesData, error: articlesError } = await supabase
              .from('guide_articles')
              .select('*')
              .eq('category_id', category.id)
              .order('position', { ascending: true });

            if (articlesError) {
              console.error("Error fetching articles for category:", category.id, articlesError);
              return { ...category, articles: [] }; // Return category with empty articles on error
            }

            return { ...category, articles: articlesData || [] };
          })
        );

        setCategories(categoriesWithArticles as CategoryType[]);
      } catch (err: any) {
        setError(err);
        toast({
          title: "Erreur",
          description: "Erreur lors du chargement des rubriques et articles",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGuidesData();
  }, []);

  // Function to update the order of categories
  const updateCategoryOrder = async (newOrder: CategoryType[]) => {
    try {
      setLoading(true);

      // Update the position of each category in the database
      const updates = newOrder.map((category, index) =>
        supabase
          .from('guide_categories')
          .update({ position: index })
          .eq('id', category.id)
      );

      const results = await Promise.all(updates);

      // Check for errors
      const errors = results.filter((result) => result.error);
      if (errors.length > 0) {
        throw new Error(`Failed to update category order: ${errors.map((e) => e.error?.message).join(', ')}`);
      }

      // Update local state
      setCategories(newOrder);

      toast({
        title: "Succès",
        description: "Ordre des rubriques mis à jour",
      });
    } catch (error: any) {
      setError(error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour de l'ordre des rubriques",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to update the order of articles within a category
  const updateArticleOrder = async (categoryId: string, newOrder: ArticleType[]) => {
    try {
      setLoading(true);

      // Update the position of each article in the database
      const updates = newOrder.map((article, index) =>
        supabase
          .from('guide_articles')
          .update({ position: index })
          .eq('id', article.id)
      );

      const results = await Promise.all(updates);

      // Check for errors
      const errors = results.filter((result) => result.error);
      if (errors.length > 0) {
        throw new Error(`Failed to update article order: ${errors.map((e) => e.error?.message).join(', ')}`);
      }

      // Update local state
      setCategories((prevCategories) => {
        return prevCategories.map((category) => {
          if (category.id === categoryId) {
            return { ...category, articles: newOrder };
          }
          return category;
        });
      });

      toast({
        title: "Succès",
        description: "Ordre des articles mis à jour",
      });
    } catch (error: any) {
      setError(error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour de l'ordre des articles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    updateCategoryOrder,
    updateArticleOrder
  };
};
