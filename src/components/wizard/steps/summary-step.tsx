'use client';

import React, { useState } from 'react';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useItemsCart } from '../provider/items-cart-provider';
import { useWizardForm } from '../provider/wizard-provider';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useWizardSteps } from '../hooks/use-wizard-steps';
import { Progress } from '@/components/ui/progress';

const SummaryStep = () => {
  const {
    selectedItems,
    getFormattedTotalVolume,
    getFormattedTotalVolumetricWeight,
    getFormattedVolume,
    getFormattedVolumetricWeight,
    getPriceTotal
  } = useItemsCart();

  const { currentStepIndex, goToPreviousStep, goBackToStart } = useWizardSteps();
  const { resetForm } = useWizardForm();
  const { clearCart } = useItemsCart();

  const { form } = useWizardForm();
  const values = form.getValues();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const sendOrder = async () => {
    setLoading(true);
    setProgress(0)

    try {
      const fakeOrderProcess = () => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false);
            setOrderCompleted(true);

            resetForm();
            clearCart();
            return 100;
          }
          return prev + 20;
        });
      };

      const interval = setInterval(fakeOrderProcess, 500);
    }
    catch (err) {
      console.log("🚀 ~ sendOrder ~ err:", err)
    } finally {
      setLoading(false);
    }
  }

  if (orderCompleted) {
    return (
      <div className='min-w-96'>
        <CardHeader>
          <CardTitle>Order Completed</CardTitle>
          <CardDescription>Your order has been submitted successfully!</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-green-600 font-semibold">✅ Your order has been processed!</p>
          <Button
            type="button"
            onClick={goBackToStart}
          >
            Back to Start
          </Button>
        </CardContent>
      </div>
    );
  }

  return (
    <div className='min-w-96'>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your order details before submitting.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 h-96 overflow-y-auto">
        <section>
          <h3 className="font-bold text-lg">Sender</h3>
          <p><strong>Name:</strong> {values.sender?.name}</p>
          <p><strong>Email:</strong> {values.sender?.email}</p>
        </section>

        <Separator className="my-2" />

        <section>
          <h3 className="font-bold text-lg">Receiver</h3>
          <p><strong>Name:</strong> {values.receiver?.name}</p>
          <p><strong>Email:</strong> {values.receiver?.email}</p>
        </section>

        <Separator className="my-2" />

        <section>
          <h3 className="font-bold text-lg">Pickup Address</h3>
          <p><strong>Address:</strong> {values.pickup?.address_line_1}</p>
          <p><strong>City:</strong> {values.pickup?.city}</p>
          <p><strong>State:</strong> {values.pickup?.state}</p>
          <p><strong>Postal Code:</strong> {values.pickup?.postal_code}</p>
          <p><strong>Country:</strong> {values.pickup?.country}</p>
        </section>

        <Separator className="my-2" />

        <section>
          <h3 className="font-bold text-lg">Destination Address</h3>
          <p><strong>Address:</strong> {values.destination?.address_line_1}</p>
          <p><strong>City:</strong> {values.destination?.city}</p>
          <p><strong>State:</strong> {values.destination?.state}</p>
          <p><strong>Postal Code:</strong> {values.destination?.postal_code}</p>
          <p><strong>Country:</strong> {values.destination?.country}</p>
        </section>

        <Separator className="my-2" />

        <section>
          <h3 className="font-bold text-lg">Items</h3>
          <ul className="space-y-2">
            {selectedItems.map(item => (
              <li key={item.id} className="border p-2 rounded-md">
                <p><strong>{item.name}</strong></p>
                <p>Length: {item.length} cm</p>
                <p>Height: {item.height} cm</p>
                <p>Depth: {item.depth} cm</p>
                <p>Volume: {getFormattedVolume(item)} cm<sup>3</sup></p>
                <p>Volumetric Weight: {getFormattedVolumetricWeight(item)} kg</p>
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        <section>
          <h3 className="font-bold text-lg">Totals</h3>
          <p><strong>Total Volume:</strong> {getFormattedTotalVolume()} cm<sup>3</sup></p>
          <p><strong>Total Volumetric Weight:</strong> {getFormattedTotalVolumetricWeight()} kg</p>
          <p><strong>Total Price:</strong> {getPriceTotal()} AUD</p>
        </section>
        <Separator className="my-2" />
        {loading
          ? <div className="flex flex-col">
            <p>Processing order...</p>
            <Progress value={progress} className="w-[60%]" />
          </div>
          : <></>}
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
            onClick={sendOrder}
          >
            Finish
          </Button>
        </div>
      </CardContent>
    </div>
  )
}

export default SummaryStep;
