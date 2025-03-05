'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CustomForm from '@/components/lib/custom-form';
import { useFormContext } from 'react-hook-form';

const SenderStep = () => {
  const { formState } = useFormContext();
  console.log("🚀 ~ SenderStep ~ formState:", formState)

  const addSender = (val: { [x: string]: string | number; }) => {
    console.log("🚀 ~ addSender ~ val:", val);
  };

  return (
    <Card className='min-w-96'>
      <CardHeader>
        <CardTitle>Sender</CardTitle>
        <CardDescription>Enter sender details</CardDescription>
      </CardHeader>
      <CardContent>
        <CustomForm
          fields={['sender.name', 'sender.email']}
          onSubmit={addSender} />
      </CardContent>
    </Card>

  )
}

export default SenderStep
