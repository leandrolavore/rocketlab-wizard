'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { Separator } from '@/components/ui/separator';

const VOLUMETRIC_DIVISOR = 6000;

function calculateVolume({
  length,
  height,
  depth
}: { length: number; height: number; depth: number }) {
  const volume = length * height * depth;
  return parseFloat(volume.toFixed(2)); // volume in cm3
}

// Source: https://www.parcelhero.com/en-gb/support/volumetric-weight-calculator
function calculateVolumetricWeight({
  length,
  height,
  depth
}: { length: number; height: number; depth: number }) {
  const volume = calculateVolume({ length, height, depth });
  const volumetricWeight = volume / VOLUMETRIC_DIVISOR;
  return parseFloat(volumetricWeight.toFixed(2)); // Volumetric weight in kg
}

type FreightItem = {
  name: string;
  length: number;
  height: number;
  depth: number;
}

const ItemsStep = () => {
  const stock: FreightItem[] = [
    { name: 'Item 1', length: 120, height: 100, depth: 30 },
    { name: 'Item 2', length: 80, height: 60, depth: 40 },
    { name: 'Item 3', length: 200, height: 50, depth: 50 },
    { name: 'Item 4', length: 150, height: 90, depth: 60 },
  ];

  return (
    <Card className='min-w-96 min-h-[720px]'>
      <CardHeader>
        <CardTitle>Pickup</CardTitle>
        <CardDescription>Enter pickup address</CardDescription>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-4'>
        {stock.map((item, idx) => <div key={`${item.name}-${idx}`}><Item item={item} /></div>)}
      </CardContent>
    </Card>
  )
}

const Item = ({ item }: { item: FreightItem }) => {
  return <Card className="cursor-pointer p-4">
    <div className="flex flex-col items-center">
      <GiCardboardBoxClosed size={72} />
      <p className="font-bold">{item.name}</p>
      <p className="text-sm">Length: {item.length}cm</p>
      <p className="text-sm">Height: {item.height}cm</p>
      <p className="text-sm">Depth: {item.depth}cm</p>
      <Separator className="my-1" />
      <p className="text-sm">Volume: {calculateVolume(item)}cm3</p>
      <p className="text-sm">Volumetric weight: {calculateVolumetricWeight(item)}kg</p>
    </div>
  </Card>
}

export default ItemsStep
