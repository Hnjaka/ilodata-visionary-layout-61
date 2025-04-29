
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { BlogArticleFormValues } from './formSchema';

interface TitleSlugFieldsProps {
  form: UseFormReturn<BlogArticleFormValues>;
  generateSlug: () => void;
}

export const TitleSlugFields: React.FC<TitleSlugFieldsProps> = ({ form, generateSlug }) => {
  return (
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
                  // Generate slug if it's empty
                  if (!form.getValues('slug')) {
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
    </div>
  );
};
