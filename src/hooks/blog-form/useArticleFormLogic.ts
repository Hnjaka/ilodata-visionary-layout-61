
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import { BlogArticleFormValues, blogArticleFormSchema } from './formSchema';
import { updateSitemap } from '@/utils/updateSitemap';
import { BlogArticle, BlogCategory } from '@/hooks/useBlogData';
import { slugify } from '@/utils/stringUtils';

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
  const { toast } = useToast();

  // Initialize form with react-hook-form
  const form = useForm<BlogArticleFormValues>({
    resolver: zodResolver(blogArticleFormSchema),
    defaultValues: {
      title: editArticle?.title || '',
      slug: editArticle?.slug || '',
      content: editArticle?.content || '',
      excerpt: editArticle?.excerpt || '',
      image: editArticle?.image || '',
      categoryId: editArticle?.category_id || '',
      published: editArticle?.published || false
    }
  });

  // Set form values when edit article changes
  useEffect(() => {
    if (editArticle) {
      form.setValue('title', editArticle.title);
      form.setValue('slug', editArticle.slug);
      form.setValue('content', editArticle.content || '');
      form.setValue('excerpt', editArticle.excerpt || '');
      form.setValue('image', editArticle.image || '');
      form.setValue('categoryId', editArticle.category_id);
      form.setValue('published', editArticle.published);
    }
  }, [editArticle, form]);

  // Generate slug from title
  const generateSlug = () => {
    const title = form.getValues('title');
    if (title) {
      const slug = slugify(title);
      form.setValue('slug', slug);
    }
  };

  // Handle form submission
  const onSubmit = async (values: BlogArticleFormValues) => {
    try {
      if (!values.categoryId) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner une catégorie",
          variant: "destructive"
        });
        return;
      }

      const { title, slug, content, excerpt, image, categoryId, published } = values;
      
      if (editArticle && editArticleCategoryIndex !== null && editArticleIndex !== null) {
        // Update existing article
        const { error } = await supabase
          .from('blog_articles')
          .update({
            title,
            slug,
            content,
            excerpt,
            image,
            category_id: categoryId,
            published,
            updated_at: new Date().toISOString()
          })
          .eq('id', editArticle.id);
        
        if (error) throw error;
        
        // Update local state
        const updatedCategories = [...categories];
        const updatedArticle = {
          ...editArticle,
          title,
          slug,
          content,
          excerpt,
          image,
          category_id: categoryId,
          published
        };
        
        // Handle if category changed
        if (categoryId !== editArticle.category_id) {
          // Remove from old category
          updatedCategories[editArticleCategoryIndex].articles = 
            updatedCategories[editArticleCategoryIndex].articles.filter(
              article => article.id !== editArticle.id
            );
          
          // Add to new category
          const newCategoryIndex = updatedCategories.findIndex(
            category => category.id === categoryId
          );
          
          if (newCategoryIndex !== -1) {
            updatedCategories[newCategoryIndex].articles.push(updatedArticle);
          }
        } else {
          // Update in same category
          updatedCategories[editArticleCategoryIndex].articles[editArticleIndex] = updatedArticle;
        }
        
        setCategories(updatedCategories);
        
        toast({
          title: "Succès",
          description: "Article modifié"
        });
        
        // Reset edit mode
        setEditArticle(null);
        setEditArticleCategoryIndex(null);
        setEditArticleIndex(null);
      } else {
        // Add new article
        const publishedAt = published ? new Date().toISOString() : null;
        
        // Add to Supabase
        const { data, error } = await supabase
          .from('blog_articles')
          .insert([{
            title,
            slug,
            content,
            excerpt,
            image,
            category_id: categoryId,
            published,
            published_at: publishedAt
          }])
          .select()
          .single();
        
        if (error) throw error;
        
        // Add to local state
        const updatedCategories = [...categories];
        const categoryIndex = updatedCategories.findIndex(
          category => category.id === categoryId
        );
        
        if (categoryIndex !== -1) {
          updatedCategories[categoryIndex].articles.push(data);
          setCategories(updatedCategories);
        }
        
        toast({
          title: "Succès",
          description: "Nouvel article ajouté"
        });
      }
      
      // If article is published, update sitemap
      if (published) {
        await updateSitemap();
      }
      
      // Reset the form
      form.reset({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        image: '',
        categoryId: '',
        published: false
      });
    } catch (error: any) {
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
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      image: '',
      categoryId: '',
      published: false
    });
  };

  return { form, onSubmit, handleCancel, generateSlug };
};
