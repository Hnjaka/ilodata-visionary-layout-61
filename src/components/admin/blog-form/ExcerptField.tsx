
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { BlogArticleFormValues } from './formSchema';

interface ExcerptFieldProps {
  form: UseFormReturn<BlogArticleFormValues>;
}

export const ExcerptField: React.FC<ExcerptFieldProps> = ({ form }) => {
  return (
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
  );
};
