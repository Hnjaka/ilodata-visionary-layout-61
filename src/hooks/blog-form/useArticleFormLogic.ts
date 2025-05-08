
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlogCategory, BlogArticle } from '@/hooks/useBlogData';
import { ArticleFormSchema, BlogArticleFormValues } from './formSchema';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { updateSitemap } from '@/utils/updateSitemap';

interface UseArticleFormLogicProps {
  categories: BlogCategory[];
  setCategories: React.Dispatch<React.SetStateAction<BlogCategory[]>>;
  editArticle: BlogArticle | null;
  editArticleCategoryIndex: number | null;
  editArticleIndex: number | null;
  setEditArticle: React.Dispatch<React.SetStateAction<BlogArticle | null>>;
  setEditArticleCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setEditArticleIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useArticleFormLogic = ({
  categories,
  setCategories,
  editArticle,
  editArticleCategoryIndex,
  editArticleIndex,
  setEditArticle,
  setEditArticleCategoryIndex,
  setEditArticleIndex
}: UseArticleFormLogicProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with edit values or defaults
  const form = useForm<BlogArticleFormValues>({
    resolver: zodResolver(ArticleFormSchema),
    defaultValues: editArticle ? {
      title: editArticle.title,
      slug: editArticle.slug,
      categoryId: editArticle.category_id,
      content: editArticle.content || '',
      excerpt: editArticle.excerpt || '',
      image: editArticle.image || '',
      published: editArticle.published
    } : {
      title: '',
      slug: '',
      categoryId: categories.length > 0 ? categories[0].id : '',
      content: '',
      excerpt: '',
      image: '',
      published: false
    }
  });

  // Handle article submission (create or update)
  const onSubmit = async (values: BlogArticleFormValues) => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      // Add published_at date if article is being published
      const published_at = values.published && !editArticle?.published_at 
        ? new Date().toISOString()
        : editArticle?.published_at;
      
      const articleData = {
        title: values.title,
        slug: values.slug,
        category_id: values.categoryId,
        content: values.content,
        excerpt: values.excerpt,
        image: values.image,
        published: values.published,
        published_at,
        // Set dates for new articles, preserve for edits
        updated_at: new Date().toISOString(),
      };
      
      let result;
      
      if (editArticle) {
        // Update existing article
        result = await supabase
          .from('blog_articles')
          .update(articleData)
          .eq('id', editArticle.id);
      } else {
        // Create new article
        result = await supabase
          .from('blog_articles')
          .insert({
            ...articleData,
            created_at: new Date().toISOString(),
            position: 0 // Default position
          });
      }
      
      if (result.error) {
        throw result.error;
      }
      
      // Update categories state
      const newCategories = [...categories];
      
      if (editArticle) {
        // Update existing article
        if (editArticleCategoryIndex !== null && editArticleIndex !== null) {
          // Same category, just update the article
          if (editArticle.category_id === values.categoryId) {
            newCategories[editArticleCategoryIndex].articles[editArticleIndex] = {
              ...editArticle,
              ...articleData,
            };
          } 
          // Category changed, remove from old and add to new
          else {
            // Remove from old category
            newCategories[editArticleCategoryIndex].articles.splice(editArticleIndex, 1);
            
            // Find new category index
            const newCategoryIndex = newCategories.findIndex(cat => cat.id === values.categoryId);
            if (newCategoryIndex !== -1) {
              // Add to new category
              newCategories[newCategoryIndex].articles.push({
                ...editArticle,
                ...articleData,
                category_id: values.categoryId
              });
            }
          }
        }
      } else {
        // Add new article to the corresponding category
        const categoryIndex = newCategories.findIndex(cat => cat.id === values.categoryId);
        if (categoryIndex !== -1) {
          // Use the result.data[0] for the new ID if available
          const newId = (result.data && result.data[0]?.id) || `temp-${Date.now()}`;
          newCategories[categoryIndex].articles.push({
            id: newId,
            title: values.title,
            slug: values.slug,
            content: values.content,
            excerpt: values.excerpt,
            image: values.image,
            category_id: values.categoryId,
            position: 0, // Default position for new articles
            published: values.published,
            published_at: published_at || undefined
          });
        }
      }
      
      // Update state with the modified categories
      setCategories(newCategories);
      
      // Reset form and edit state
      form.reset();
      setEditArticle(null);
      setEditArticleCategoryIndex(null);
      setEditArticleIndex(null);
      
      toast({
        title: editArticle ? "Article modifié" : "Article créé",
        description: `L'article "${values.title}" a été ${editArticle ? "modifié" : "créé"} avec succès.`,
      });

      // Update sitemap when an article is published or updated
      if (values.published) {
        try {
          await updateSitemap();
        } catch (sitemapError) {
          console.error("Erreur lors de la mise à jour du sitemap:", sitemapError);
          // Ne pas bloquer la fonction principale si la mise à jour du sitemap échoue
        }
      }
      
    } catch (error) {
      console.error('Error submitting article:', error);
      toast({
        title: "Erreur",
        description: `Une erreur est survenue lors de l'${editArticle ? 'modification' : 'ajout'} de l'article.`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate slug from title
  const generateSlug = () => {
    const title = form.getValues('title');
    if (title) {
      // Basic slug generation: lowercase, replace accents, spaces with hyphens, remove special chars
      const slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      
      form.setValue('slug', slug);
    }
  };

  const handleCancel = () => {
    form.reset();
    setEditArticle(null);
    setEditArticleCategoryIndex(null);
    setEditArticleIndex(null);
  };

  return {
    form,
    onSubmit,
    handleCancel,
    generateSlug,
    isSubmitting
  };
};
