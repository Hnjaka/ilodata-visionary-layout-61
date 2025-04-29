
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { BlogCategoryFormValues } from './CategoryFormSchema';

interface TitleFieldProps {
  form: UseFormReturn<BlogCategoryFormValues>;
}

export const TitleField: React.FC<TitleFieldProps> = ({ form }) => {
  return (
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
  );
};
