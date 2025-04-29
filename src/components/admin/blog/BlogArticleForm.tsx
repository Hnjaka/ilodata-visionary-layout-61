import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { BlogCategory, BlogArticle } from '@/hooks/useBlogData';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RichTextEditor from '@/components/admin/article-form/rich-editor/RichTextEditor';

interface BlogArticleFormProps {
  categories: BlogCategory[];
  setCategories: React.Dispatch<React.SetStateAction<BlogCategory[]>>;
  editArticle: BlogArticle | null;
  editArticleCategoryIndex: number | null;
  editArticleIndex: number | null;
  setEditArticle: React.Dispatch<React.SetStateAction<BlogArticle | null>>;
  setEditArticleCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setEditArticleIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const formSchema = z.object({
  title: z.string().min(1, "Le titre ne peut pas être vide"),
  slug: z.string().min(1, "Le slug ne peut pas être vide"),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  categoryId: z.string().min(1, "Veuillez sélectionner une catégorie"),
  published: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const BlogArticleForm: React.FC<BlogArticleFormProps> = ({
  categories,
  setCategories,
  editArticle,
  editArticleCategoryIndex,
  editArticleIndex,
  setEditArticle,
  setEditArticleCategoryIndex,
  setEditArticleIndex
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
  React.useEffect(() => {
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

  const onSubmit = async (values: FormValues) => {
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

  return (
    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">
        {editArticle ? "Modifier l'article" : "Ajouter un article"}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Titre de l'article" 
                      {...field}
                      onBlur={() => {
                        // Generate slug if this is a new article and slug is empty
                        if (!editArticle && !form.getValues('slug')) {
                          generateSlug();
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Slug Field */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (URL)</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder="slug-url" {...field} />
                    </FormControl>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={generateSlug}
                    >
                      Générer
                    </Button>
                  </div>
                  <FormDescription>
                    L'URL où l'article sera accessible
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Category Field */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Image Field */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image (URL)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormDescription>
                    URL de l'image principale de l'article
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Excerpt Field */}
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extrait</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Un court extrait de l'article qui sera affiché dans la liste des articles" 
                    {...field} 
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormDescription>
                  Une brève description qui apparaîtra dans les aperçus d'articles
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Content Field */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenu</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value || ''}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Published Field */}
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Publier l'article</FormLabel>
                  <FormDescription>
                    L'article sera visible publiquement sur le site
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="flex space-x-2">
            <Button 
              type="submit" 
              disabled={categories.length === 0}
            >
              {editArticle ? "Mettre à jour" : "Ajouter"}
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

export default BlogArticleForm;
