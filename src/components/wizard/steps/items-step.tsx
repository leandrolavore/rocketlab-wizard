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
  const { goToPreviousStep, goToNextStep, currentStepIndex } = useWizardSteps();
  const {
    stock,
    selectedItems,
    getFormattedTotalVolume,
    getFormattedTotalVolumetricWeight,
    getPriceTotal
  } = useItemsCart();

  return (
    <div className='min-w-96 min-h-[720px]'>
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
          <p><strong>Total Volume:</strong> {getFormattedTotalVolume()}cm³</p>
          <p><strong>Volumetric weight:</strong>  {getFormattedTotalVolumetricWeight()}kg</p>
          <p><strong>Total Freigth Price:</strong> {getPriceTotal()} AUD</p>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between mt-4">
          <Button
            type="button"
            variant="outline"
            className='cursor-pointer'
            onClick={goToPreviousStep}
            disabled={currentStepIndex === 0}
          >
            Back
          </Button>
          <Button
            type="button"
            className='cursor-pointer'
            disabled={!selectedItems?.length}
            onClick={goToNextStep}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </div>
  )
}

const Item = ({ item }: { item: FreightItem }) => {
  const {
    isItemInOrder,
    addItemToOrder,
    removeItemFromOrder,
    getFormattedVolume,
    getFormattedVolumetricWeight
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
        <p className="text-sm">Volume: {getFormattedVolume(item)}cm³</p>
        <p className="text-sm">Volumetric weight: {getFormattedVolumetricWeight(item)}kg</p>
      </div>
    </Card>
  )
}

export default ItemsStep
