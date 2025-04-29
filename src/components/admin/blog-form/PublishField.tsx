
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';
import { BlogArticleFormValues } from './formSchema';

interface PublishFieldProps {
  form: UseFormReturn<BlogArticleFormValues>;
}

export const PublishField: React.FC<PublishFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="published"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel>Publier l'article</FormLabel>
            <FormDescription>
              L'article sera visible publiquement sur le site
            </FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
