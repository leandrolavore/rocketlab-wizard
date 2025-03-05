'use client';

import React from 'react'
import SenderStep from './steps/sender-step';
import { useWizardSteps } from './hooks/use-wizard-steps';
import ReceiverStep from './steps/receiver-step';
import PickupStep from './steps/pickup-step';
import DestinationStep from './steps/detination-step';
import ItemsStep from './steps/items-step';
import SummaryStep from './steps/summary-step';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const Wizard = () => {
  const { currentStep, goToStep } = useWizardSteps();

  const steps = [
    { key: 'sender', label: 'Sender' },
    { key: 'receiver', label: 'Receiver' },
    { key: 'pickup', label: 'Pick up' },
    { key: 'destination', label: 'Destination' },
    { key: 'items', label: 'Items' },
    { key: 'summary', label: 'Summary' },
  ];

  return (
    <Card className="flex flex-col px-4">
      <Tabs className='gap-6' defaultValue='sender' value={currentStep}>
        <TabsList aria-label="Wizard Steps" className="grid grid-cols-6 mx-6">
          {steps.map((step, idx) => (
            <TabsTrigger
              key={step.key}
              value={step.key}
              className={`text-sm ${currentStep === step.key ? 'font-bold' : ''} cursor-pointer`}
              disabled={false}
              onClick={() => goToStep(idx)}
            >
              {step.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="sender">
          <SenderStep />
        </TabsContent>
        <TabsContent value="receiver">
          <ReceiverStep />
        </TabsContent>
        <TabsContent value="pickup">
          <PickupStep />
        </TabsContent>
        <TabsContent value="destination">
          <DestinationStep />
        </TabsContent>
        <TabsContent value="items">
          <ItemsStep />
        </TabsContent>
        <TabsContent value="summary">
          <SummaryStep />
        </TabsContent>
      </Tabs>
    </Card>
  )
}

export default Wizard
