
import React from 'react';
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../TemplateFormFields';

interface VisibilityFieldProps {
  form: UseFormReturn<FormValues>;
}

const VisibilityField: React.FC<VisibilityFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="visible"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Visible</FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
};

export default VisibilityField;
