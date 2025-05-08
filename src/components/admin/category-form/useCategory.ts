
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoryType } from '@/types/guides';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Define form schema for category
import { z } from 'zod';

const categoryFormSchema = z.object({
  title: z.string().min(1, "Le titre ne peut pas être vide"),
  icon: z.string().optional()
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface UseCategoryProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  editCategory: CategoryType | null;
  editCategoryIndex: number | null;
  setEditCategory: React.Dispatch<React.SetStateAction<CategoryType | null>>;
  setEditCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useCategory = ({
  categories,
  setCategories,
  editCategory,
  editCategoryIndex,
  setEditCategory,
  setEditCategoryIndex
}: UseCategoryProps) => {
  const { toast } = useToast();
  
  // Initialize form with react-hook-form
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: editCategory?.title || '',
      icon: editCategory?.icon || ''
    }
  });

  // Set form values when edit category changes
  React.useEffect(() => {
    if (editCategory) {
      form.setValue('title', editCategory.title);
      form.setValue('icon', editCategory.icon || '');
    }
  }, [editCategory, form]);

  // Handle form submission
  const onSubmit = async (values: CategoryFormValues) => {
    try {
      if (editCategory && editCategoryIndex !== null) {
        // Update existing category
        const { title, icon } = values;
        
        // Update in Supabase
        const { error } = await supabase
          .from('guide_categories')
          .update({ title, icon })
          .eq('id', editCategory.id);
        
        if (error) throw error;
        
        // Update local state
        const updatedCategories = [...categories];
        updatedCategories[editCategoryIndex] = {
          ...categories[editCategoryIndex],
          title,
          icon
        };
        
        setCategories(updatedCategories);
        
        toast({
          title: "Succès",
          description: "Rubrique modifiée"
        });
        
        // Reset edit mode
        setEditCategory(null);
        setEditCategoryIndex(null);
      } else {
        // Add new category
        const { title, icon } = values;
        
        // Add to Supabase
        const { data, error } = await supabase
          .from('guide_categories')
          .insert([{ title, icon, position: categories.length }])
          .select()
          .single();
        
        if (error) throw error;
        
        // Add to local state with empty articles array
        setCategories([...categories, { ...data, articles: [] }]);
        
        toast({
          title: "Succès",
          description: "Nouvelle rubrique ajoutée"
        });
      }
      
      // Reset the form
      form.reset({
        title: '',
        icon: ''
      });
    } catch (error: any) {
      console.error('Error saving category:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'enregistrement de la rubrique",
        variant: "destructive"
      });
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditCategory(null);
    setEditCategoryIndex(null);
    form.reset({
      title: '',
      icon: ''
    });
  };

  return { form, onSubmit, handleCancel };
};
