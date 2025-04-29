
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { BlogArticleFormValues } from './formSchema';

interface ImageFieldProps {
  form: UseFormReturn<BlogArticleFormValues>;
}

export const ImageField: React.FC<ImageFieldProps> = ({ form }) => {
  return (
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
  );
};
