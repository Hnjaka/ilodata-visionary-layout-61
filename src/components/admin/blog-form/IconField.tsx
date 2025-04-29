
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from 'react-hook-form';
import { BlogCategoryFormValues } from './CategoryFormSchema';

// Available icons for selection
const availableIcons = [
  'Book', 'FileText', 'Shapes', 'Printer', 'ImageIcon', 
  'PanelLeft', 'LayoutTemplate', 'FileCode'
];

interface IconFieldProps {
  form: UseFormReturn<BlogCategoryFormValues>;
}

export const IconField: React.FC<IconFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="icon"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Icône</FormLabel>
          <Select 
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une icône" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {availableIcons.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  {icon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
