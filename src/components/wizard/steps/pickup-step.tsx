'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomForm from '@/components/lib/custom-form';


const PickupStep = () => {
  const addPickupLocation = (val: { [x: string]: string | number; }) => {
    console.log("🚀 ~ addSender ~ val:", val);
  };

  return (
    <Card className='min-w-96 min-h-[742px]'>
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
          onSubmit={addPickupLocation} />
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  )
}

export default PickupStep
