
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import RichTextEditor from '@/components/admin/article-form/rich-editor/RichTextEditor';
import { BlogArticleFormValues } from './formSchema';

interface ContentFieldProps {
  form: UseFormReturn<BlogArticleFormValues>;
}

export const ContentField: React.FC<ContentFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Contenu</FormLabel>
          <FormControl>
            <RichTextEditor
              value={field.value || ''}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
