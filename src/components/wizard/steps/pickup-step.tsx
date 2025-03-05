'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomForm from '@/components/lib/custom-form';


const PickupStep = () => {
  return (
    <Card className='min-w-96'>
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
        />
      </CardContent>
    </Card>
  )
}

export default PickupStep
