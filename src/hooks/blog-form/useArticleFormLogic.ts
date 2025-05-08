
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { BlogCategory, BlogArticle } from '@/hooks/useBlogData';
import { ArticleFormSchema, BlogArticleFormValues } from './formSchema';
import { useToast } from '@/hooks/use-toast';
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
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize react-hook-form
  const form = useForm<BlogArticleFormValues>({
    resolver: zodResolver(ArticleFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      category_id: "",
      image: "",
      excerpt: "",
      content: "",
      published: false,
      published_at: undefined
    }
  });

  // Update form values when editing an article
  useState(() => {
    if (editArticle && editArticleCategoryIndex !== null) {
      form.reset({
        title: editArticle.title || "",
        slug: editArticle.slug || "",
        category_id: editArticle.category_id || "",
        image: editArticle.image || "",
        excerpt: editArticle.excerpt || "",
        content: editArticle.content || "",
        published: editArticle.published || false,
        published_at: editArticle.published_at ? new Date(editArticle.published_at) : undefined
      });
    }
  }, [editArticle, form]);

  // Handle form submission
  const onSubmit = async (values: BlogArticleFormValues) => {
    try {
      // Validate category selection
      if (!values.category_id) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner une catégorie",
          variant: "destructive"
        });
        return;
      }
      
      // Convert published_at to ISO string if published is true
      const publishedAt = values.published
        ? (values.published_at ? values.published_at.toISOString() : new Date().toISOString())
        : null;

      if (editArticle && editArticleCategoryIndex !== null && editArticleIndex !== null) {
        // Update existing article
        const { error } = await supabase
          .from('blog_articles')
          .update({
            title: values.title,
            slug: values.slug,
            category_id: values.category_id,
            image: values.image,
            excerpt: values.excerpt,
            content: values.content,
            published: values.published,
            published_at: publishedAt
          })
          .eq('id', editArticle.id);
          
        if (error) throw error;
        
        // Update local state
        const updatedCategories = [...categories];
        
        // Find the category and article to update
        const categoryToUpdateIndex = updatedCategories.findIndex(cat => cat.id === editArticle.category_id);
        
        if (categoryToUpdateIndex !== -1 && updatedCategories[categoryToUpdateIndex].articles) {
          const articleToUpdateIndex = updatedCategories[categoryToUpdateIndex].articles?.findIndex(art => art.id === editArticle.id);
          
          if (articleToUpdateIndex !== -1) {
            // Update the article
            updatedCategories[categoryToUpdateIndex].articles![articleToUpdateIndex] = {
              ...editArticle,
              title: values.title,
              slug: values.slug,
              category_id: values.category_id,
              image: values.image,
              excerpt: values.excerpt,
              content: values.content,
              published: values.published,
              published_at: publishedAt
            };
            
            setCategories(updatedCategories);
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
        const { data: newArticle, error } = await supabase
          .from('blog_articles')
          .insert({
            title: values.title,
            slug: values.slug,
            category_id: values.category_id,
            image: values.image,
            excerpt: values.excerpt,
            content: values.content,
            published: values.published,
            published_at: publishedAt
          })
          .select()
          .single();
          
        if (error) throw error;
        
        // Now add to state with ID from Supabase
        const updatedCategories = [...categories];
        
        // Find the category to update
        const categoryToUpdateIndex = updatedCategories.findIndex(cat => cat.id === values.category_id);
        
        if (categoryToUpdateIndex !== -1) {
          // Add the new article to the category
          if (!updatedCategories[categoryToUpdateIndex].articles) {
            updatedCategories[categoryToUpdateIndex].articles = [];
          }
          
          updatedCategories[categoryToUpdateIndex].articles?.push({
            ...newArticle,
            title: values.title,
            slug: values.slug,
            category_id: values.category_id,
            image: values.image,
            excerpt: values.excerpt,
            content: values.content,
            published: values.published,
            published_at: publishedAt
          });
          
          setCategories(updatedCategories);
        }
        
        toast({
          title: "Succès",
          description: "Nouvel article ajouté",
        });
      }
      
      // Update sitemap
      await updateSitemap();
      
      // Redirect to the blog article
      navigate('/articles/' + values.slug);
      
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'enregistrement de l'article",
        variant: "destructive"
      });
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditArticle(null);
    setEditArticleCategoryIndex(null);
    setEditArticleIndex(null);
    form.reset({
      title: "",
      slug: "",
      category_id: "",
      image: "",
      excerpt: "",
      content: "",
      published: false,
      published_at: undefined
    });
  };
  
  // Generate slug from title
  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    form.setValue('slug', slug);
  };

  return {
    form,
    onSubmit,
    handleCancel,
    generateSlug
  };
};
