'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createContext, useContext, useState } from 'react';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const wizardSchema = z.object({
  sender: z.object({
    name: z.string().min(2, { message: 'Sender name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid sender email' }),
  }),
  receiver: z.object({
    name: z.string().min(2, { message: 'Receiver name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid receiver email' }),
  }),
  pickup: z.object({
    address_line_1: z.string().min(3, 'First Line is too short'),
    city: z.string().min(3, 'City is too short'),
    state: z.string().min(2, 'State is too short'),
    postal_code: z.string().min(3, 'Postal code is too short'),
    country: z.string().min(2, 'Country is required'),
  }),
  destination: z.object({
    address_line_1: z.string().nonempty('First Line is required').min(3, 'First Line is too short'),
    city: z.string().nonempty('City is required').min(3, 'City is too short'),
    state: z.string().nonempty('State is required').min(2, 'State is too short'),
    postal_code: z.string().nonempty('Postal code is required').min(3, 'Postal code  is too short'),
    country: z.string().nonempty('Country is required'),
  })
});

type WizardFormData = z.infer<typeof wizardSchema>;
type WizardContextType = {
  form: UseFormReturn<WizardFormData>;
  currentStepIndex: number;
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>;
};

const WizardFormContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      sender: { name: '', email: '' },
      receiver: { name: '', email: '' },
      pickup: {
        address_line_1: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
      },
      destination: {
        address_line_1: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
      },
    },
    mode: 'onTouched',
  });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  return (
    <WizardFormContext.Provider value={{ form, currentStepIndex, setCurrentStepIndex }}>
      <FormProvider {...form}>
        {children}
      </FormProvider>
    </WizardFormContext.Provider>
  );
};


export const useWizardForm = () => {
  const context = useContext(WizardFormContext);
  if (!context) {
    throw new Error('useWizardForm must be used within a <WizardProvider>');
  }
  return context;
};