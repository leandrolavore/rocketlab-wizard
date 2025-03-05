'use client';

import React from 'react';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomForm from '@/components/lib/custom-form';

const ReceiverStep = () => {
  return (
    <div className='min-w-96'>
      <CardHeader>
        <CardTitle>Receiver</CardTitle>
        <CardDescription>Enter receiver details</CardDescription>
      </CardHeader>
      <CardContent>
        <CustomForm fields={['receiver.name', 'receiver.email']} />
      </CardContent>
    </div>
  )
}

export default ReceiverStep;
