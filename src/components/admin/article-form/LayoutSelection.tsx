
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define the schema for this part of the form
export const layoutSchema = z.object({
  layout: z.enum(["standard", "wide", "sidebar"]).default("standard")
});

// Extract the type from the schema
export type LayoutValues = z.infer<typeof layoutSchema>;

interface LayoutSelectionProps {
  form: UseFormReturn<any>;
}

const LayoutSelection: React.FC<LayoutSelectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="layout"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Mise en page</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="standard" />
                </FormControl>
                <FormLabel className="font-normal">
                  Standard
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="wide" />
                </FormControl>
                <FormLabel className="font-normal">
                  Large
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="sidebar" />
                </FormControl>
                <FormLabel className="font-normal">
                  Avec barre latérale
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LayoutSelection;
