
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Define the schema for this part of the form
export const contentSchema = z.object({
  content: z.string().optional().default(''),
});

// Extract the type from the schema
export type ContentValues = z.infer<typeof contentSchema>;

interface ContentFieldProps {
  form: UseFormReturn<any>;
}

const ContentField: React.FC<ContentFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Contenu de l'article</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Contenu de l'article en Markdown"
              className="min-h-[200px]"
              {...field}
              // Ensure value is never undefined to prevent destructuring errors
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ContentField;
