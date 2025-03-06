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
import AutoCompleteInput from './auto-complete-input';

const CustomForm = ({ fields, isAddress = false }: {
  fields: string[];
  isAddress?: boolean;
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
      {isAddress ? <FormField
        key="pickup.autocomplete"
        control={form.control}
        name="pickup.autocomplete"
        render={() => (
          <FormItem className='my-2'>
            <FormLabel>Search Address</FormLabel>
            <AutoCompleteInput
              onSelectAddress={(address) => {
                form.setValue('pickup.address_line_1', address.line1);
                form.setValue('pickup.city', address.city);
                form.setValue('pickup.state', address.state);
                form.setValue('pickup.postal_code', address.postalCode);
                form.setValue('pickup.country', address.country);
              }}
            />
          </FormItem>
        )}
      /> : <></>}
      {fields.map((key) => (
        <FormField
          key={key}
          control={form.control}
          name={key as string}
          render={({ field }) => (
            <FormItem className='my-2'>
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