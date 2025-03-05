'use client';

import React from 'react'
import SenderStep from './steps/sender-step';
import { useWizardSteps } from './hooks/use-wizard-steps';
import ReceiverStep from './steps/receiver-step';
import PickupStep from './steps/pickup-step';
import DestinationStep from './steps/detination-step';
import ItemsStep from './steps/items-step';
import { ItemsCartProvider } from './provider/items-cart-provider';

const Wizard = () => {
  const { currentStep, currentStepIndex } = useWizardSteps();
  console.log("🚀 ~ Wizard ~ currentStepIndex:", currentStepIndex)

  return (
    <div className="flex flex-col space-y-6">
      {currentStep === 'sender' && <SenderStep />}
      {currentStep === 'receiver' && <ReceiverStep />}
      {currentStep === 'pickup' && <PickupStep />}
      {currentStep === 'destination' && <DestinationStep />}
      {currentStep === 'items' && <ItemsCartProvider><ItemsStep /></ItemsCartProvider>}
    </div>
  )
}

export default Wizard
