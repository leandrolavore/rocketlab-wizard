'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useWizardSteps } from '../hooks/use-wizard-steps';
import { FreightItem, useItemsCart } from '../provider/items-cart-provider';

const ItemsStep = () => {
  const { goToPreviousStep, steps, currentStepIndex } = useWizardSteps();
  const { stock, calculateTotalVolume, calculateTotalVolumetricWeight } = useItemsCart();

  return (
    <Card className='min-w-96 min-h-[720px]'>
      <CardHeader>
        <CardTitle>Pickup</CardTitle>
        <CardDescription>Enter pickup address</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4 mb-4'>
          {stock.map((item, idx) => <div key={`${item.name}-${idx}`}><Item item={item} /></div>)}
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col">
          <p>Total Volume: {calculateTotalVolume()}</p>
          <p>Volumetric weight: {calculateTotalVolumetricWeight()}</p>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={goToPreviousStep}
            disabled={currentStepIndex === 0}
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={() => { }}
          >
            {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const Item = ({ item }: { item: FreightItem }) => {
  const {
    calculateVolume,
    calculateVolumetricWeight,
    isItemInOrder,
    addItemToOrder,
    removeItemFromOrder
  } = useItemsCart();

  const isInOrder = isItemInOrder(item);

  return (
    <Card
      className={`cursor-pointer p-4 border rounded-lg transition-all duration-200 ${isInOrder
        ? 'border-primary shadow-md bg-primary/10'
        : 'border-muted bg-background'
        }`}
      onClick={() => isInOrder ? removeItemFromOrder(item) : addItemToOrder(item)}
    >
      <div className="flex flex-col items-center">
        <GiCardboardBoxClosed size={72} />
        <p className="font-bold">{item.name}</p>
        <p className="text-sm">Length: {item.length}cm</p>
        <p className="text-sm">Height: {item.height}cm</p>
        <p className="text-sm">Depth: {item.depth}cm</p>
        <Separator className="my-1" />
        <p className="text-sm">Volume: {calculateVolume(item)}cm</p>
        <p className="text-sm">Volumetric weight: {calculateVolumetricWeight(item)}kg</p>
      </div>
    </Card>
  )
}

export default ItemsStep
