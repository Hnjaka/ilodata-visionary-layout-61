
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { articleFormSchema, ArticleFormValues } from '@/components/admin/article-form/formSchema';
import { CategoryType, ArticleType } from '@/types/guides';

interface UseArticleFormProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  editArticle: ArticleType | null;
  editArticleCategoryIndex: number | null;
  editArticleIndex: number | null;
  setEditArticle: React.Dispatch<React.SetStateAction<ArticleType | null>>;
  setEditArticleCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setEditArticleIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useArticleForm = ({
  categories,
  setCategories,
  editArticle,
  editArticleCategoryIndex,
  editArticleIndex,
  setEditArticle,
  setEditArticleCategoryIndex,
  setEditArticleIndex
}: UseArticleFormProps) => {
  // Initialize react-hook-form
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      categoryIndex: categories.length > 0 ? 0 : undefined,
      content: "",
      layout: "standard"
    }
  });

  // Update form values when editing an article
  useEffect(() => {
    if (editArticle && editArticleCategoryIndex !== null) {
      form.reset({
        title: editArticle?.title || "",
        slug: editArticle?.slug || "",
        categoryIndex: editArticleCategoryIndex,
        content: editArticle?.content || "",
        layout: editArticle?.layout || "standard"
      });
    }
  }, [editArticle, editArticleCategoryIndex, form]);

  // Handle adding/editing an article
  const onSubmit = (values: ArticleFormValues) => {
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
        // Ensure the target category exists and has an articles array
        if (!updatedCategories[categoryIndex]) {
          toast({
            title: "Erreur",
            description: "Catégorie cible invalide",
            variant: "destructive"
          });
          return;
        }
        
        // Ensure the target category's articles array exists
        if (!updatedCategories[categoryIndex].articles) {
          updatedCategories[categoryIndex].articles = [];
        }
        
        // Remove from old category if it exists
        if (updatedCategories[editArticleCategoryIndex].articles.length > editArticleIndex) {
          updatedCategories[editArticleCategoryIndex].articles.splice(editArticleIndex, 1);
        }
        
        // Add to new category
        updatedCategories[categoryIndex].articles.push({
          title: title,
          slug: slug,
          content: content || '',
          layout: layout
        });
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
      
      updatedCategories[categoryIndex].articles.push({
        title: title,
        slug: slug,
        content: content || '',
        layout: layout
      });
      
      toast({
        title: "Succès",
        description: "Nouvel article ajouté",
      });
    }
    
    setCategories(updatedCategories);
    form.reset({
      title: "",
      slug: "",
      categoryIndex: categoryIndex,
      content: "",
      layout: "standard"
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditArticle(null);
    setEditArticleCategoryIndex(null);
    setEditArticleIndex(null);
    form.reset({
      title: "",
      slug: "",
      categoryIndex: categories.length > 0 ? 0 : undefined,
      content: "",
      layout: "standard"
    });
  };

  return {
    form,
    onSubmit,
    handleCancel,
    isEditing: !!editArticle,
    categories, // Make sure to return these props
    editArticle // Make sure to return this too
  };
};
