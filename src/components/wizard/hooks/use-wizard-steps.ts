'use client';

import { useItemsCart } from "../provider/items-cart-provider";
import { useWizardForm } from "../provider/wizard-provider";

const steps = ['sender', 'receiver', 'pickup', 'destination', 'items', 'summary'] as const;
export type Step = (typeof steps)[number];

export const useWizardSteps = () => {
  const { currentStepIndex, setCurrentStepIndex, form } = useWizardForm();
  const { selectedItems } = useItemsCart();

  const currentStep = steps[currentStepIndex];

  const goToNextStep = async () => {
    const isValid = await validateStep(currentStep);

    if (isValid) {
      setCurrentStepIndex((prev: number) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const goToPreviousStep = () => {
    setCurrentStepIndex((prev: number) => Math.max(prev - 1, 0));
  };

  const goBackToStart = () => {
    setCurrentStepIndex(0);
  }

  const goToStep = (val: number) => {
    setCurrentStepIndex(val);
  }

  const validateStep = async (step: Step) => {
    switch (step) {
      case 'sender':
        return await form.trigger(['sender.name', 'sender.email']);
      case 'receiver':
        return await form.trigger(['receiver.name', 'receiver.email']);
      case 'pickup':
        return await form.trigger([
          'pickup.address_line_1',
          'pickup.city',
          'pickup.state',
          'pickup.postal_code',
          'pickup.country',
        ]);
      case 'destination':
        return await form.trigger([
          'destination.address_line_1',
          'destination.city',
          'destination.state',
          'destination.postal_code',
          'destination.country',
        ]);
      case 'items':
        return selectedItems?.length;
      case 'summary':
        return true;
    }
  };

  return {
    steps,
    currentStep,
    currentStepIndex,
    goToNextStep,
    goToPreviousStep,
    goBackToStart,
    goToStep,
  };
};