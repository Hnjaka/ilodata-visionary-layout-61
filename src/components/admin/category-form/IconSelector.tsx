
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { CategoryFormValues } from './CategoryFormSchema';

// Available icons for selection
const availableIcons = [
  'Book', 'FileText', 'Shapes', 'Printer', 'ImageIcon', 
  'PanelLeft', 'LayoutTemplate', 'FileCode'
];

interface IconSelectorProps {
  form: UseFormReturn<CategoryFormValues>;
  selectedIcon?: string; // Add as optional prop for direct usage
  onSelect?: (iconName: string) => void; // Add as optional prop for direct usage
}

export const IconSelector: React.FC<IconSelectorProps> = ({ form, selectedIcon, onSelect }) => {
  // Handle direct usage or form usage
  const handleChange = (value: string) => {
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <FormField
      control={form.control}
      name="icon"
      render={({ field }) => (
        <FormItem className="w-1/3">
          <FormLabel>Icône</FormLabel>
          <Select 
            onValueChange={(value) => {
              field.onChange(value);
              handleChange(value);
            }}
            defaultValue={selectedIcon || field.value}
            value={selectedIcon || field.value}
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
