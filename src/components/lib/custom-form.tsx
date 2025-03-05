'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import { useWizardSteps } from '../wizard/hooks/use-wizard-steps';
import { Separator } from '../ui/separator';

const CustomForm = ({ fields }: {
  fields: string[];
}) => {
  const form = useFormContext();
  const { currentStepIndex, steps, goToNextStep, goToPreviousStep } = useWizardSteps();

  function prettifyLabel(key: string): string {
    const parts = key.split('.');
    const fieldName = parts[parts.length - 1];

    return fieldName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <Form {...form}>
      {fields.map((key) => (
        <FormField
          key={key}
          control={form.control}
          name={key as string}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{prettifyLabel(key)}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Separator className="my-2" />
      <div className="flex justify-between mt-4">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={goToPreviousStep}
          disabled={currentStepIndex === 0}
        >
          Back
        </Button>

        <Button
          type="button"
          className="cursor-pointer"
          onClick={goToNextStep}
        >
          {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </Form>
  );
};

export default CustomForm;