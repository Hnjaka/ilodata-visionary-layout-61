
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BlogCategory, BlogArticle } from '@/hooks/useBlogData';
import { blogArticleFormSchema, BlogArticleFormValues } from '@/components/admin/blog-form/formSchema';

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
  const form = useForm<BlogArticleFormValues>({
    resolver: zodResolver(blogArticleFormSchema),
    defaultValues: {
      title: editArticle?.title || "",
      slug: editArticle?.slug || "",
      content: editArticle?.content || "",
      excerpt: editArticle?.excerpt || "",
      image: editArticle?.image || "",
      categoryId: editArticle?.category_id || (categories.length > 0 ? categories[0].id : ""),
      published: editArticle?.published || false,
    },
  });

  // Update form values when editArticle changes
  useEffect(() => {
    if (editArticle) {
      form.setValue("title", editArticle.title);
      form.setValue("slug", editArticle.slug);
      form.setValue("content", editArticle.content || "");
      form.setValue("excerpt", editArticle.excerpt || "");
      form.setValue("image", editArticle.image || "");
      form.setValue("categoryId", editArticle.category_id);
      form.setValue("published", editArticle.published);
    }
  }, [editArticle, form]);

  // Function to generate slug from title
  const generateSlug = () => {
    const title = form.getValues('title');
    if (!title) return;
    
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Remove consecutive hyphens
      
    form.setValue('slug', slug);
  };

  const onSubmit = async (values: BlogArticleFormValues) => {
    try {
      if (editArticle && editArticleCategoryIndex !== null && editArticleIndex !== null) {
        // Determine if the category has changed
        const categoryChanged = values.categoryId !== editArticle.category_id;
        
        // Update existing article
        const updateData: any = {
          title: values.title,
          slug: values.slug,
          content: values.content,
          excerpt: values.excerpt,
          image: values.image,
          published: values.published,
          category_id: values.categoryId,
          updated_at: new Date().toISOString()
        };
        
        // Set published_at date if publishing for the first time
        if (values.published && !editArticle.published) {
          updateData.published_at = new Date().toISOString();
        }
        
        const { data, error } = await supabase
          .from('blog_articles')
          .update(updateData)
          .eq('id', editArticle.id)
          .select();
        
        if (error) throw error;
        
        const updatedCategories = [...categories];
        
        if (categoryChanged) {
          // Remove from old category
          updatedCategories[editArticleCategoryIndex].articles.splice(editArticleIndex, 1);
          
          // Add to new category
          const newCategoryIndex = updatedCategories.findIndex(c => c.id === values.categoryId);
          
          if (newCategoryIndex !== -1) {
            const updatedArticle = {
              ...editArticle,
              title: values.title,
              slug: values.slug,
              content: values.content,
              excerpt: values.excerpt,
              image: values.image,
              published: values.published,
              published_at: values.published && !editArticle.published 
                ? new Date().toISOString() 
                : editArticle.published_at,
              category_id: values.categoryId
            };
            
            updatedCategories[newCategoryIndex].articles.push(updatedArticle);
          }
        } else {
          // Update in the same category
          const updatedArticle = {
            ...editArticle,
            title: values.title,
            slug: values.slug,
            content: values.content,
            excerpt: values.excerpt,
            image: values.image,
            published: values.published,
            published_at: values.published && !editArticle.published 
              ? new Date().toISOString() 
              : editArticle.published_at,
          };
          
          updatedCategories[editArticleCategoryIndex].articles[editArticleIndex] = updatedArticle;
        }
        
        setCategories(updatedCategories);
        
        toast({
          title: "Succès",
          description: "Article mis à jour",
        });
        
        // Reset form state
        setEditArticle(null);
        setEditArticleCategoryIndex(null);
        setEditArticleIndex(null);
      } else {
        // Add new article
        const categoryIndex = categories.findIndex(c => c.id === values.categoryId);
        
        if (categoryIndex === -1) {
          toast({
            title: "Erreur",
            description: "Catégorie non trouvée",
            variant: "destructive"
          });
          return;
        }
        
        const newPosition = categories[categoryIndex].articles 
          ? Math.max(0, ...categories[categoryIndex].articles.map(a => a.position)) + 1 
          : 0;
        
        const newArticleData = {
          title: values.title,
          slug: values.slug,
          content: values.content,
          excerpt: values.excerpt,
          image: values.image,
          category_id: values.categoryId,
          position: newPosition,
          published: values.published,
          published_at: values.published ? new Date().toISOString() : null
        };
        
        const { data, error } = await supabase
          .from('blog_articles')
          .insert(newArticleData)
          .select();
        
        if (error) throw error;
        
        if (data && data[0]) {
          const newArticle: BlogArticle = {
            id: data[0].id,
            title: data[0].title,
            slug: data[0].slug,
            content: data[0].content,
            excerpt: data[0].excerpt,
            image: data[0].image,
            category_id: data[0].category_id,
            position: data[0].position,
            published: data[0].published,
            published_at: data[0].published_at
          };
          
          const updatedCategories = [...categories];
          if (!updatedCategories[categoryIndex].articles) {
            updatedCategories[categoryIndex].articles = [];
          }
          updatedCategories[categoryIndex].articles.push(newArticle);
          
          setCategories(updatedCategories);
          
          toast({
            title: "Succès",
            description: "Nouvel article ajouté",
          });
        }
      }
      
      // Reset form
      form.reset({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        image: "",
        categoryId: categories.length > 0 ? categories[0].id : "",
        published: false,
      });
      
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'enregistrement de l'article",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditArticle(null);
    setEditArticleCategoryIndex(null);
    setEditArticleIndex(null);
    form.reset({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      image: "",
      categoryId: categories.length > 0 ? categories[0].id : "",
      published: false,
    });
  };

  return {
    form,
    onSubmit,
    handleCancel,
    generateSlug
  };
};
