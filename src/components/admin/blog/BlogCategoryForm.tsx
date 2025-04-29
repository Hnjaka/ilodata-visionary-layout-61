
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { BlogCategory } from '@/hooks/useBlogData';
import { supabase } from '@/integrations/supabase/client';
import { IconSelector } from '@/components/admin/category-form/IconSelector';

interface BlogCategoryFormProps {
  categories: BlogCategory[];
  setCategories: React.Dispatch<React.SetStateAction<BlogCategory[]>>;
  editCategory: BlogCategory | null;
  editCategoryIndex: number | null;
  setEditCategory: React.Dispatch<React.SetStateAction<BlogCategory | null>>;
  setEditCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const formSchema = z.object({
  title: z.string().min(1, "Le titre ne peut pas être vide"),
  icon: z.string().min(1, "Veuillez sélectionner une icône"),
});

type FormValues = z.infer<typeof formSchema>;

const BlogCategoryForm: React.FC<BlogCategoryFormProps> = ({
  categories,
  setCategories,
  editCategory,
  editCategoryIndex,
  setEditCategory,
  setEditCategoryIndex
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: editCategory?.title || "",
      icon: editCategory?.icon ? (typeof editCategory.icon === 'string' ? editCategory.icon : 'book') : 'book',
    },
  });

  // Update form values when editCategory changes
  React.useEffect(() => {
    if (editCategory) {
      form.setValue("title", editCategory.title);
      form.setValue("icon", typeof editCategory.icon === 'string' ? editCategory.icon : 'book');
    }
  }, [editCategory, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (editCategory && editCategoryIndex !== null) {
        // Update existing category
        const { data, error } = await supabase
          .from('blog_categories')
          .update({
            title: values.title,
            icon: values.icon,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editCategory.id)
          .select();
        
        if (error) throw error;
        
        const updatedCategories = [...categories];
        const updatedCategory = {
          ...editCategory,
          title: values.title,
          icon: values.icon
        };
        updatedCategories[editCategoryIndex] = updatedCategory;
        setCategories(updatedCategories);
        
        toast({
          title: "Succès",
          description: "Catégorie mise à jour",
        });
        
        // Reset form state
        setEditCategory(null);
        setEditCategoryIndex(null);
      } else {
        // Add new category
        const newPosition = Math.max(0, ...categories.map(c => c.position)) + 1;
        
        const { data, error } = await supabase
          .from('blog_categories')
          .insert({
            title: values.title,
            icon: values.icon,
            position: newPosition
          })
          .select();
        
        if (error) throw error;
        
        if (data && data[0]) {
          const newCategory: BlogCategory = {
            id: data[0].id,
            title: data[0].title,
            icon: values.icon,
            position: data[0].position,
            articles: []
          };
          
          setCategories([...categories, newCategory]);
          
          toast({
            title: "Succès",
            description: "Nouvelle catégorie ajoutée",
          });
        }
      }
      
      // Reset form
      form.reset({
        title: "",
        icon: "book"
      });
      
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'enregistrement de la catégorie",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditCategory(null);
    setEditCategoryIndex(null);
    form.reset({
      title: "",
      icon: "book"
    });
  };

  const handleIconChange = (iconName: string) => {
    form.setValue("icon", iconName);
  };

  return (
    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">
        {editCategory ? "Modifier la catégorie" : "Ajouter une catégorie"}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre de la catégorie</FormLabel>
                <FormControl>
                  <Input placeholder="Titre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icône</FormLabel>
                <FormControl>
                  <IconSelector
                    selectedIcon={field.value}
                    onSelect={handleIconChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex space-x-2">
            <Button type="submit">
              {editCategory ? "Modifier" : "Ajouter"}
            </Button>
            
            {editCategory && (
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

export default BlogCategoryForm;
