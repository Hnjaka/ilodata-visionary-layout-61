
import React from 'react';
import { PlusCircle } from 'lucide-react';
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
}

const ArticleForm: React.FC<ArticleFormProps> = ({ categories, setCategories }) => {
  // Initialize react-hook-form
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      categoryIndex: categories.length > 0 ? 0 : undefined
    }
  });

  // Handle adding a new article
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
    updatedCategories[categoryIndex].articles.push({
      title: title,
      slug: slug
    });
    
    setCategories(updatedCategories);
    form.reset({
      title: "",
      slug: "",
      categoryIndex: categoryIndex
    });
    
    toast({
      title: "Succès",
      description: "Nouvel article ajouté",
    });
  };

  return (
    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Ajouter un article</h3>
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
          <Button type="submit" disabled={categories.length === 0}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Ajouter l'article
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ArticleForm;
