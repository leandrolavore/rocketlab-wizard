'use client';

import React from 'react';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomForm from '@/components/lib/custom-form';

const SenderStep = () => {
  return (
    <div className='min-w-96'>
      <CardHeader>
        <CardTitle>Sender</CardTitle>
        <CardDescription>Enter sender details</CardDescription>
      </CardHeader>
      <CardContent>
        <CustomForm fields={['sender.name', 'sender.email']} />
      </CardContent>
    </div>
  )
}

export default SenderStep
