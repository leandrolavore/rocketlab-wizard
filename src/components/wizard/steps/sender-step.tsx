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

const SenderStep = () => {
  return (
    <Card className='min-w-96'>
      <CardHeader>
        <CardTitle>Sender</CardTitle>
        <CardDescription>Enter sender details</CardDescription>
      </CardHeader>
      <CardContent>
        <CustomForm fields={['sender.name', 'sender.email']} />
      </CardContent>
    </Card>
  )
}

export default SenderStep
