'use client';

import React from 'react';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CustomForm from '@/components/lib/custom-form';

const DestinationStep = () => {
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
        />
      </CardContent>
    </div>
  )
}

export default DestinationStep
