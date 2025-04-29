
import React, { useEffect } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define form schema for validation
const articleFormSchema = z.object({
  title: z.string().min(1, "Le titre de l'article ne peut pas être vide"),
  slug: z.string().min(1, "Le slug de l'article ne peut pas être vide"),
  categoryIndex: z.number().min(0, "Veuillez sélectionner une catégorie"),
  content: z.string().optional(),
  layout: z.enum(["standard", "wide", "sidebar"]).default("standard")
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
          
          <FormField
            control={form.control}
            name="layout"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Mise en page</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="standard" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Standard
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="wide" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Large
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="sidebar" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Avec barre latérale
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenu de l'article</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Contenu de l'article en Markdown"
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
