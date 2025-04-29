
import React, { useEffect } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getIconByName, getIconName } from '@/data/guidesData';
import { CategoryType } from '@/types/guides';
import { supabase } from '@/integrations/supabase/client';

// Define form schema for validation
const categoryFormSchema = z.object({
  title: z.string().min(1, "Le titre de la rubrique ne peut pas être vide"),
  icon: z.string().default("Book")
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  editCategory: CategoryType | null;
  editCategoryIndex: number | null;
  setEditCategory: React.Dispatch<React.SetStateAction<CategoryType | null>>;
  setEditCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ 
  categories, 
  setCategories, 
  editCategory, 
  editCategoryIndex, 
  setEditCategory,
  setEditCategoryIndex 
}) => {
  // Available icons for selection
  const availableIcons = [
    'Book', 'FileText', 'Shapes', 'Printer', 'ImageIcon', 'PanelLeft', 'LayoutTemplate', 'FileCode'
  ];

  // Initialize react-hook-form
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: "",
      icon: "Book"
    }
  });

  // Update form values when editing a category
  useEffect(() => {
    if (editCategory) {
      const iconName = typeof editCategory.icon === 'string' 
        ? editCategory.icon 
        : getIconName(editCategory.icon);
        
      form.reset({
        title: editCategory.title,
        icon: iconName
      });
    }
  }, [editCategory, form]);

  // Handle adding/editing a category
  const onSubmit = async (values: CategoryFormValues) => {
    // Get the icon component from the name
    const IconComponent = getIconByName(values.icon);
    
    try {
      if (editCategory && editCategoryIndex !== null) {
        // Update existing category
        const updatedCategories = [...categories];
        updatedCategories[editCategoryIndex] = {
          ...editCategory,
          title: values.title,
          icon: IconComponent
        };
        
        // Update in Supabase
        const { error } = await supabase
          .from('guide_categories')
          .update({
            title: values.title,
            icon: values.icon
          })
          .eq('id', editCategory.id);
          
        if (error) throw error;
        
        setCategories(updatedCategories);
        
        toast({
          title: "Succès",
          description: "Rubrique modifiée",
        });
        
        // Reset edit mode
        setEditCategory(null);
        setEditCategoryIndex(null);
        
      } else {
        // Add new category
        
        // First create in Supabase
        const { data: newCategory, error } = await supabase
          .from('guide_categories')
          .insert({
            title: values.title,
            icon: values.icon,
            position: categories.length // Add at the end
          })
          .select()
          .single();
          
        if (error) throw error;
        
        // Now add to state with ID from Supabase
        const updatedCategories = [...categories, {
          id: newCategory.id,
          title: values.title,
          icon: IconComponent,
          articles: []
        }];
        
        setCategories(updatedCategories);
        
        toast({
          title: "Succès",
          description: "Nouvelle rubrique ajoutée",
        });
      }
      
      form.reset({
        title: "",
        icon: "Book"
      });
    } catch (error) {
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
      title: "",
      icon: "Book"
    });
  };

  return (
    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">
        {editCategory ? "Modifier la rubrique" : "Ajouter une rubrique"}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 items-end">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Titre de la rubrique</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Titre de la rubrique"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Icône</FormLabel>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une icône" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableIcons.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex space-x-2">
            <Button type="submit">
              {editCategory ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Modifier
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Ajouter
                </>
              )}
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

export default CategoryForm;
