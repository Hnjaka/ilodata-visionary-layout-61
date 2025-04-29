
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import RichTextEditor from './rich-editor/RichTextEditor';

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
            <RichTextEditor 
              value={field.value || ""}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ContentField;
