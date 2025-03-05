'use client';

import React from 'react'
import SenderStep from './steps/sender-step';
import { useWizardSteps } from './hooks/use-wizard-steps';
import ReceiverStep from './steps/receiver-step';
import PickupStep from './steps/pickup-step';
import DestinationStep from './steps/detination-step';
import ItemsStep from './steps/items-step';
import { ItemsCartProvider } from './provider/items-cart-provider';
import SummaryStep from './steps/summary-step';

const Wizard = () => {
  const { currentStep } = useWizardSteps();

  return (
    <div className="flex flex-col space-y-6">
      {currentStep === 'sender' && <SenderStep />}
      {currentStep === 'receiver' && <ReceiverStep />}
      {currentStep === 'pickup' && <PickupStep />}
      {currentStep === 'destination' && <DestinationStep />}
      <ItemsCartProvider>
        {currentStep === 'items' && <ItemsStep />}
        {currentStep === 'summary' && <SummaryStep />}
      </ItemsCartProvider>
    </div>
  )
}

export default Wizard
