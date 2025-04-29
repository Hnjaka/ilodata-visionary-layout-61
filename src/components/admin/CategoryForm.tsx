
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { getIconByName } from '@/data/guidesData';
import { CategoryType } from '@/types/guides';

// Define form schema for validation
const categoryFormSchema = z.object({
  title: z.string().min(1, "Le titre de la rubrique ne peut pas être vide"),
  icon: z.string().default("Book")
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categories, setCategories }) => {
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

  // Handle adding a new category
  const onSubmit = (values: CategoryFormValues) => {
    // Use getIconByName to get the actual component
    const IconComponent = getIconByName(values.icon);
    
    const updatedCategories = [...categories, {
      title: values.title,
      icon: IconComponent,
      articles: []
    }];
    
    setCategories(updatedCategories);
    form.reset();
    
    toast({
      title: "Succès",
      description: "Nouvelle rubrique ajoutée",
    });
  };

  return (
    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Ajouter une rubrique</h3>
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
                    placeholder="Nouvelle rubrique"
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
          
          <Button type="submit">
            <PlusCircle className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
