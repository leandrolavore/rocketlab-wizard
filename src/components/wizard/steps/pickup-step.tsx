'use client';

import React from 'react';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomForm from '@/components/lib/custom-form';
import { useFormContext } from 'react-hook-form';


const PickupStep = () => {
  const form = useFormContext();

  return (
    <div className='min-w-96'>
      <CardHeader>
        <CardTitle>Pickup</CardTitle>
        <CardDescription>Enter pickup address</CardDescription>
      </CardHeader>
      <CardContent>
        <CustomForm
          fields={[
            'pickup.address_line_1',
            'pickup.city',
            'pickup.state',
            'pickup.postal_code',
            'pickup.country',
          ]}
          isAddress={true}
          onSelectedAddress={(address) => {
            const line1 = address?.line1?.split(',');
            form.setValue('pickup.address_line_1', line1[0]);
            form.setValue('pickup.city', address.city);
            form.setValue('pickup.state', address.state);
            form.setValue('pickup.postal_code', address.postalCode);
            form.setValue('pickup.country', address.country);
          }}
        />
      </CardContent>
    </div>
  )
}

export default PickupStep
