
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Define the schema for this part of the form
export const titleSlugSchema = z.object({
  title: z.string().min(1, "Le titre de l'article ne peut pas être vide"),
  slug: z.string().min(1, "Le slug de l'article ne peut pas être vide"),
});

// Extract the type from the schema
export type TitleSlugValues = z.infer<typeof titleSlugSchema>;

interface TitleSlugFieldsProps {
  form: UseFormReturn<any>;
}

const TitleSlugFields: React.FC<TitleSlugFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Titre de l'article</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Titre de l'article"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slug (URL)</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="nom-article-url"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default TitleSlugFields;
