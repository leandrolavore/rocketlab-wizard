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

const ReceiverStep = () => {
  const addReceiver = (val: { [x: string]: string | number; }) => {
    console.log("🚀 ~ addReceiver ~ val:", val);
  };

  return (
    <Card className='min-w-96'>
      <CardHeader>
        <CardTitle>Receiver</CardTitle>
        <CardDescription>Enter receiver details</CardDescription>
      </CardHeader>
      <CardContent>
        <CustomForm
          fields={['receiver.name', 'receiver.email']}
          onSubmit={addReceiver} />
      </CardContent>
    </Card>
  )
}

export default ReceiverStep;
