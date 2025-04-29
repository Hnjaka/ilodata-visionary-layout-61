
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { CategoryType } from '@/types/guides';

// Define the schema for this part of the form
export const categorySchema = z.object({
  categoryIndex: z.number().min(0, "Veuillez sélectionner une catégorie"),
});

// Extract the type from the schema
export type CategoryValues = z.infer<typeof categorySchema>;

interface CategorySelectionProps {
  form: UseFormReturn<any>;
  categories: CategoryType[];
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ form, categories }) => {
  return (
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
  );
};

export default CategorySelection;
