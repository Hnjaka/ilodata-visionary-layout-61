
import React, { useEffect } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CategoryType } from '@/types/guides';

// Define form schema for validation
const articleFormSchema = z.object({
  title: z.string().min(1, "Le titre de l'article ne peut pas être vide"),
  slug: z.string().min(1, "Le slug de l'article ne peut pas être vide"),
  categoryIndex: z.number().min(0, "Veuillez sélectionner une catégorie")
});

type ArticleFormValues = z.infer<typeof articleFormSchema>;

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
      categoryIndex: categories.length > 0 ? 0 : undefined
    }
  });

  // Update form values when editing an article
  useEffect(() => {
    if (editArticle && editArticleCategoryIndex !== null) {
      form.reset({
        title: editArticle.title,
        slug: editArticle.slug,
        categoryIndex: editArticleCategoryIndex
      });
    }
  }, [editArticle, editArticleCategoryIndex, form]);

  // Handle adding/editing an article
  const onSubmit = (values: ArticleFormValues) => {
    const { title, slug, categoryIndex } = values;
    
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
          slug: slug
        });
      } else {
        // Just update in the same category
        updatedCategories[categoryIndex].articles[editArticleIndex] = {
          title: title,
          slug: slug
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
        slug: slug
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
      categoryIndex: categoryIndex
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
      categoryIndex: categories.length > 0 ? 0 : undefined
    });
  };

  return (
    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">
        {editArticle ? "Modifier l'article" : "Ajouter un article"}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre de l'article</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Titre de l'article"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (URL)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="nom-article-url"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="categoryIndex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rubrique</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={field.value}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    >
                      {categories.length === 0 ? (
                        <option value="">Aucune rubrique disponible</option>
                      ) : (
                        categories.map((category, index) => (
                          <option key={index} value={index}>
                            {category.title}
                          </option>
                        ))
                      )}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-2">
            <Button type="submit" disabled={categories.length === 0}>
              {editArticle ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Modifier l'article
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Ajouter l'article
                </>
              )}
            </Button>
            
            {editArticle && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ArticleForm;
