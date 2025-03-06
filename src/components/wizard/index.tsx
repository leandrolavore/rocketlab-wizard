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
import { useWizardForm } from './provider/wizard-provider';
import { AiOutlineCheck } from 'react-icons/ai';
import { motion } from "motion/react";

const Wizard = () => {
  const { validSteps } = useWizardForm();
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
    <Card className="flex flex-col px-4 mx-4 max-h-9/10 overflow-y-auto">
      <Tabs className='gap-6' defaultValue='sender' value={currentStep}>
        <TabsList
          aria-label="Wizard Steps"
          className="
            mx-6 grid
            h-auto
            grid-cols-3 md:grid-cols-6
            text-xs md:text-sm
            bg-muted/50
            rounded-lg
          "
        >
          {steps.map((step, idx) => {
            const isComplete = validSteps[step.key];
            const isFirstStep = idx === 0;
            const prevStepKey = steps[idx - 1]?.key;
            const prevStepComplete = isFirstStep || (prevStepKey && validSteps[prevStepKey]);
            const isDisabled = !isComplete && !prevStepComplete;

            return <TabsTrigger
              key={step.key}
              value={step.key}
              className={`text-sm ${currentStep === step.key ? 'font-bold' : ''} cursor-pointer`}
              disabled={isDisabled}
              onClick={() => goToStep(idx)}
            >
              {step.label}
              {isComplete && <AiOutlineCheck className="text-green-600" />}
            </TabsTrigger>
          }
          )}
        </TabsList>
        <TabsContent value="sender">
          <motion.div
            key="sender"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SenderStep />
          </motion.div>
        </TabsContent>
        <TabsContent value="receiver">
          <motion.div
            key="receiver"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >

            <ReceiverStep />
          </motion.div>
        </TabsContent>
        <TabsContent value="pickup">
          <motion.div
            key="pickup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PickupStep />
          </motion.div>
        </TabsContent>
        <TabsContent value="destination">
          <motion.div
            key="destination"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DestinationStep />
          </motion.div>
        </TabsContent>
        <TabsContent value="items">
          <motion.div
            key="items"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ItemsStep />
          </motion.div>
        </TabsContent>
        <TabsContent value="summary">
          <motion.div
            key="summary  "
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SummaryStep />
          </motion.div>
        </TabsContent>
      </Tabs>
    </Card >
  )
}

export default Wizard
