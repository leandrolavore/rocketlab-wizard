'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CustomForm from '@/components/lib/custom-form';

const DestinationStep = () => {
  const addDestinationLocation = (val: { [x: string]: string | number; }) => {
    console.log("🚀 ~ addSender ~ val:", val);
  };

  return (
    <Card className='min-w-96 min-h-[742px]'>
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
          onSubmit={addDestinationLocation} />
      </CardContent>
    </Card>
  )
}

export default DestinationStep
