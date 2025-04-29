
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from '@/components/ui/use-toast';
import { Form } from "@/components/ui/form";
import { CategoryType } from '@/types/guides';
import { articleFormSchema, ArticleFormValues } from './article-form/formSchema';

// Import subcomponents
import TitleSlugFields from './article-form/TitleSlugFields';
import CategorySelection from './article-form/CategorySelection';
import LayoutSelection from './article-form/LayoutSelection';
import ContentField from './article-form/ContentField';
import FormActions from './article-form/FormActions';

interface ArticleFormProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  editArticle: any | null;
  editArticleCategoryIndex: number | null;
  editArticleIndex: number | null;
  setEditArticle: React.Dispatch<React.SetStateAction<any | null>>;
  setEditArticleCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setEditArticleIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ 
  categories, 
  setCategories,
  editArticle,
  editArticleCategoryIndex,
  editArticleIndex,
  setEditArticle,
  setEditArticleCategoryIndex,
  setEditArticleIndex
}) => {
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
        title: editArticle.title,
        slug: editArticle.slug,
        categoryIndex: editArticleCategoryIndex,
        content: editArticle.content || "",
        layout: editArticle.layout || "standard"
      });
    }
  }, [editArticle, editArticleCategoryIndex, form]);

  // Handle adding/editing an article
  const onSubmit = (values: ArticleFormValues) => {
    const { title, slug, categoryIndex, content, layout } = values;
    
    if (categoryIndex === undefined || categoryIndex < 0 || categoryIndex >= categories.length) {
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
      
      // If category changed, remove from old and add to new
      if (editArticleCategoryIndex !== categoryIndex) {
        // Remove from old category
        updatedCategories[editArticleCategoryIndex].articles.splice(editArticleIndex, 1);
        
        // Add to new category
        updatedCategories[categoryIndex].articles.push({
          title: title,
          slug: slug,
          content: content,
          layout: layout
        });
      } else {
        // Just update in the same category
        updatedCategories[categoryIndex].articles[editArticleIndex] = {
          title: title,
          slug: slug,
          content: content,
          layout: layout
        };
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
      updatedCategories[categoryIndex].articles.push({
        title: title,
        slug: slug,
        content: content,
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

  return (
    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">
        {editArticle ? "Modifier l'article" : "Ajouter un article"}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TitleSlugFields form={form} />
            <CategorySelection form={form} categories={categories} />
          </div>
          
          <LayoutSelection form={form} />
          <ContentField form={form} />
          
          <FormActions 
            isEditing={!!editArticle}
            isCategoryAvailable={categories.length > 0}
            onCancel={handleCancel}
          />
        </form>
      </Form>
    </div>
  );
};

export default ArticleForm;
