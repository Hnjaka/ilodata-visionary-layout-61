
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../TemplateFormFields';

interface CategoryTagFieldsProps {
  form: UseFormReturn<FormValues>;
}

const CategoryTagFields: React.FC<CategoryTagFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="categorie"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Catégorie *</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Livres">Livres</SelectItem>
                <SelectItem value="Magazines">Magazines</SelectItem>
                <SelectItem value="CV">CV</SelectItem>
                <SelectItem value="Flyers">Flyers</SelectItem>
                <SelectItem value="Rapports">Rapports</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Tags séparés par des virgules" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CategoryTagFields;
