'use client';

import React from 'react';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CustomForm from '@/components/lib/custom-form';
import { useFormContext } from 'react-hook-form';

const DestinationStep = () => {
  const form = useFormContext();

  return (
    <div className='min-w-96'>
      <CardHeader>
        <CardTitle>Destination</CardTitle>
        <CardDescription>Enter destination address</CardDescription>
      </CardHeader>
      <CardContent>
        <CustomForm
          fields={[
            'destination.address_line_1',
            'destination.city',
            'destination.state',
            'destination.postal_code',
            'destination.country',
          ]}
          isAddress={true}
          onSelectedAddress={(address) => {
            const line1 = address?.line1?.split(',');
            form.setValue('destination.address_line_1', line1[0]);
            form.setValue('destination.city', address.city);
            form.setValue('destination.state', address.state);
            form.setValue('destination.postal_code', address.postalCode);
            form.setValue('destination.country', address.country);
          }}
        />
      </CardContent>
    </div>
  )
}

export default DestinationStep
