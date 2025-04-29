
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
import { CategoryFormValues } from './CategoryFormSchema';

interface TitleFieldProps {
  form: UseFormReturn<CategoryFormValues>;
}

export const TitleField: React.FC<TitleFieldProps> = ({ form }) => {
  return (
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
  );
};
